export interface IWithResponsiveModeState {
  responsiveMode?: ResponsiveMode
}

export enum ResponsiveMode {
  small = 0,
  medium = 1,
  large = 2,
  xLarge = 3,
  xxLarge = 4,
  xxxLarge = 5,
  unknown = 999,
}

const RESPONSIVE_MAX_CONSTRAINT = [479, 639, 1023, 1365, 1919, 99999999]

/**
 * User specified mode to default to, useful for server side rendering scenarios.
 */
let _defaultMode: ResponsiveMode | undefined

/**
  * Tracking the last mode we successfully rendered, which allows us to
  * paint initial renders with the correct size.
  */
let _lastMode: ResponsiveMode | undefined

export function getInitialResponsiveMode(): ResponsiveMode {
  return _defaultMode ?? _lastMode ?? ResponsiveMode.large
}

/**
 * Hook to get the current responsive mode (window size category).
 * @param currentWindow - Use this window when determining the responsive mode.
 */
export function getResponsiveMode(currentWindow: Window | undefined): ResponsiveMode {
  let responsiveMode = ResponsiveMode.small

  if (currentWindow) {
    try {
      while (currentWindow.innerWidth > RESPONSIVE_MAX_CONSTRAINT[responsiveMode]) {
        responsiveMode++
      }
    }
    catch (e) {
      // Return a best effort result in cases where we're in the browser but it throws on getting innerWidth.
      responsiveMode = getInitialResponsiveMode()
    }

    // Tracking last mode just gives us a better default in future renders,
    // which avoids starting with the wrong value if we've measured once.
    _lastMode = responsiveMode
  }
  else {
    if (_defaultMode !== undefined) {
      responsiveMode = _defaultMode
    }
    else {
      throw new Error(
        'Content was rendered in a server environment without providing a default responsive mode. '
          + 'Call setResponsiveMode to define what the responsive mode is.',
      )
    }
  }

  return responsiveMode
}

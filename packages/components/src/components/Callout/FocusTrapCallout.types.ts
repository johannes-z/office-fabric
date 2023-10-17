import type { IFocusTrapZoneProps } from '..'
import type { ICalloutProps } from './Callout.types'

/**
 * {@docCategory Callout}
 */
export interface IFocusTrapCalloutProps extends ICalloutProps {
  /**
   * Optional props to be passed on to FocusTrapZone
   */
  focusTrapProps?: IFocusTrapZoneProps
}

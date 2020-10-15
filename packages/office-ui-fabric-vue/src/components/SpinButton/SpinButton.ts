import { SpinButtonBase } from './SpinButton.base'
import { getStyles } from './SpinButton.styles'
import { styled } from '../styled'

/**
 * The SpinButton control and related tabs pattern are used for navigating frequently accessed,
 * distinct content categories. SpinButtons allow for navigation between two or more content
 * views and relies on text headers to articulate the different sections of content.
 */
export const SpinButton = styled(
  SpinButtonBase,
  getStyles,
  undefined,
  {
    scope: 'SpinButton',
  },
)

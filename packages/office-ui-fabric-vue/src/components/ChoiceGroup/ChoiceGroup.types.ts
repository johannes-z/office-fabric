import { IStyle } from '@uifabric/merge-styles'

export interface IChoiceGroupStyles {
  /**
   * The actual root of the component.
   * @deprecated Styles will be merged with `root` in a future release.
   */
  applicationRole?: IStyle;
  /**
   * Not currently the actual root of the component (will be fixed in a future release).
   * For now, to style the actual root, use `applicationRole`.
   */
  root?: IStyle;
  label?: IStyle;
  flexContainer?: IStyle;
}

import { IStyle } from '@uifabric/merge-styles'

export interface IIconProps {
  /**
   * The name of the icon to use from the icon font. If string is empty, a
   * placeholder icon will be rendered the same width as an icon.
   */
  iconName?: string;
}

export interface IIconStyles {
  root?: IStyle;
}

import { IBaseProps } from '@/types'
import { IStyle, IStyleFunctionOrObject } from '@uifabric/merge-styles'
import { ITheme } from '@uifabric/styling'
import { IImageProps } from '../Image'

export interface IIconProps extends IBaseProps {
  /**
   * The name of the icon to use from the icon font.
   * If string is empty, a placeholder icon will be rendered the same width as an icon.
   */
  iconName?: string;

  /**
   * If rendering an image icon, these props will be passed to the Image component.
   */
  imageProps?: IImageProps;

  /**
   * If rendering an image icon, this component will be rendered in the event that loading the image fails.
   */
  imageErrorAs?: any;

  /**
   * Gets the styles for an Icon.
   */
  styles?: IStyleFunctionOrObject<IIconStyleProps, IIconStyles>;
  theme?: ITheme;
}

/**
 * {@docCategory Icon}
 */
export interface IIconStyleProps {
  className?: string;
  iconClassName?: string;
  isPlaceholder: boolean;
  isImage: boolean;
  styles?: Partial<IIconStyles>;
  theme?: ITheme;
}

/**
 * {@docCategory Icon}
 */
export interface IIconStyles {
  root?: IStyle;
}

/**
 * Props for a basic icon component which only supports font glyphs and can't be targeted by customizations.
 * {@docCategory Icon}
 */
export interface IFontIconProps extends IBaseProps {
  /**
   * The name of the icon to use from the icon font.
   * If string is empty, a placeholder icon will be rendered the same width as an icon.
   */
  iconName?: string;

  /**
   * Custom class to style the icon.
   */
  className?: string;
}

/**
 * Props for a basic image icon component which doesn't directly provide image load error handling
 * and can't be targeted by customizations.
 * {@docCategory Icon}
 */
export interface IImageIconProps {
  /**
   * Props passed to the Image component.
   */
  imageProps: IImageProps;

  /**
   * Custom class to style the icon.
   */
  className?: string;
}

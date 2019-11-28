import { IStyle } from '../BaseComponent'

export interface IImageStyleProps {
}

export interface IImageStyles {
  /**
   * Style set for the root div element.
   */
  root: IStyle;
  /**
   * Style set for the img element.
   */
  image: IStyle;
}

export enum ImageFit {
  /**
   * The image is not scaled. The image is centered and cropped within the content box.
   */
  center = 0,

  /**
   * The image is scaled to maintain its aspect ratio while being fully contained within the frame. The image will
   * be centered horizontally and vertically within the frame. The space in the top and bottom or in the sides of
   * the frame will be empty depending on the difference in aspect ratio between the image and the frame.
   */
  contain = 1,

  /**
   * The image is scaled to maintain its aspect ratio while filling the frame. Portions of the image will be cropped from
   * the top and bottom, or from the sides, depending on the difference in aspect ratio between the image and the frame.
   */
  cover = 2,

  /**
   * Neither the image nor the frame are scaled. If their sizes do not match, the image will either be cropped or the
   * frame will have empty space.
   */
  none = 3,

  /**
   * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
   * behave as ImageFit.center if the image's natural height or width is less than the Image frame's height or width,
   * but if both natural height and width are larger than the frame it will behave as ImageFit.cover.
   */
  centerCover = 4,

  /**
   * The image will be centered horizontally and vertically within the frame and maintains its aspect ratio. It will
   * behave as ImageFit.center if the image's natural height and width is less than the Image frame's height and width,
   * but if either natural height or width are larger than the frame it will behave as ImageFit.contain.
   */
  centerContain = 5
}

export enum ImageCoverStyle {
  /**
   * The image will be shown at 100% height of container and the width will be scaled accordingly
   */
  landscape = 0,

  /**
   * The image will be shown at 100% width of container and the height will be scaled accordingly
   */
  portrait = 1
}

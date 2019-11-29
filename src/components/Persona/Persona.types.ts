import { IStyle } from '../BaseComponent'

export interface IPersonaProps {

}

export interface IPersonaStyles {
  root: IStyle;
  coin: IStyle;
  imageArea: IStyle;
  imageContainer: IStyle;
  image: IStyle;
  presence: IStyle;
  presenceIcon: IStyle;
  presenceCoin: IStyle;
  details: IStyle;
  primaryText: IStyle;
  tooltipHostRoot: IStyle;
  secondaryText: IStyle;
  tertiaryText: IStyle;
  optionalText: IStyle;
  withoutPresenceIcon: IStyle;
  personaInitials: IStyle;
}

export enum PersonaInitialsColor {
  lightBlue = 0,
  blue = 1,
  darkBlue = 2,
  teal = 3,
  lightGreen = 4,
  green = 5,
  darkGreen = 6,
  lightPink = 7,
  pink = 8,
  magenta = 9,
  purple = 10,
  /**
   * `black` is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides.
   * @deprecated will be removed in a future major release.
   */
  black = 11,
  orange = 12,
  /**
   * `red` is a color that often has a special meaning, so it is considered a reserved color and can only be set with overrides
   * @deprecated will be removed in a future major release.
   */
  red = 13,
  darkRed = 14,
  /**
   * Transparent is not intended to be used with typical initials due to accessibility issues.
   * Its primary use is for overflow buttons, so it is considered a reserved color and can only be set with overrides.
   */
  transparent = 15,
  violet = 16,
  lightRed = 17,
  gold = 18,
  burgundy = 19,
  warmGray = 20,
  coolGray = 21,
  /**
   * `gray` is a color that can result in offensive persona coins with some initials combinations, so it can only be set with overrides
   */
  gray = 22,
  cyan = 23,
  rust = 24
}

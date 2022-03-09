import { ITextProps, ITextStyles } from './Text.types'

export const getStyles: any = (props: ITextProps): ITextStyles => {
  const { as, className, block, nowrap, variant, theme } = props
  const { fonts, semanticColors } = theme!
  const variantObject = fonts[variant || 'medium']

  return {
    root: [
      variantObject,
      {
        color: variantObject.color || semanticColors.bodyText,
        display: block ? (as === 'td' ? 'table-cell' : 'block') : 'inline',
        mozOsxFontSmoothing: variantObject.MozOsxFontSmoothing,
        webkitFontSmoothing: variantObject.WebkitFontSmoothing,
      },
      nowrap && {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
      className,
    ],
  } as ITextStyles
}

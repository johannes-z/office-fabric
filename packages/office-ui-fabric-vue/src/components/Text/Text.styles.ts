import { ITextStyles } from './Text.types'

export const getStyles: any = (props: any): any => {
  const { theme, as, className, block, nowrap, variant, fontSize } = props
  const { fonts, semanticColors } = theme
  const variantObject = fonts[variant || 'medium']

  return {
    root: [
      theme.fonts.medium,
      {
        display: (block || nowrap) ? (as === 'td' ? 'table-cell' : 'block') : 'inline',
        fontFamily: (variantObject && variantObject.fontFamily) || 'inherit',
        fontSize: fontSize || (variantObject && variantObject.fontSize) || 'inherit',
        fontWeight: (variantObject && variantObject.fontWeight) || 'inherit',
        color: variantObject.color || semanticColors.bodyText,
        mozOsxFontSmoothing: variantObject && variantObject.MozOsxFontSmoothing,
        webkitFontSmoothing: variantObject && variantObject.WebkitFontSmoothing,
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

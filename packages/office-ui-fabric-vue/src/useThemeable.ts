import { getTheme, ITheme } from '@fluentui/style-utilities'

export const withThemeableProps = () => ({
  className: { type: String, default: '' },
  styles: { type: [Object, Function] as unknown as () => any, default: undefined },
  theme: { type: Object as () => ITheme, default: () => getTheme() },
})

export const useThemeable = (getClassNames, props) => {
  return getClassNames(props.styles, props)
}

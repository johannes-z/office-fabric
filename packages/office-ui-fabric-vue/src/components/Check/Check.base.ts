import { Vue, Component, Prop } from 'vue-property-decorator'
import StatelessComponent from '../StatelessComponent'
import { CreateElement, RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { ICheckStyleProps, ICheckStyles } from './Check.types'
import { FontIcon, Icon } from '../Icon'

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>()

@Component
export class CheckBase extends StatelessComponent {
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: true }) useFastIcons!: boolean

  render (h: CreateElement, ctx: RenderContext) {
    const { checked, className, theme, styles, useFastIcons } = ctx.props

    const classNames = getClassNames(styles!, { theme: theme!, className, checked })
    const IconComponent = useFastIcons ? FontIcon : Icon

    return h('div', { class: classNames.root }, [
      h(IconComponent, { class: classNames.circle, props: { iconName: 'CircleRating' } }),
      h(IconComponent, { class: classNames.check, props: { iconName: 'StatusCircleCheckmark' } }),
    ])
  }
}

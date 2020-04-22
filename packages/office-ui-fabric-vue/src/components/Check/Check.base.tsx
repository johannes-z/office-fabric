import { Vue, Component, Prop } from 'vue-property-decorator'
import StatelessComponent from '../StatelessComponent'
import { RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { ICheckStyleProps, ICheckStyles } from './Check.types'
import { FontIcon, Icon } from '../Icon'

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>()

@Component
export class CheckBase extends StatelessComponent {
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: true }) useFastIcons!: boolean
  render (h, ctx: RenderContext) {
    const { checked, className, theme, styles, useFastIcons } = ctx.props

    const classNames = getClassNames(styles!, { theme: theme!, className, checked })
    const IconComponent = useFastIcons ? FontIcon : Icon

    return (
      <div class={classNames.root}>
        <IconComponent icon-name="CircleRing" class={classNames.circle} />
        <IconComponent icon-name="StatusCircleCheckmark" class={classNames.check} />
      </div>
    )
  }
}

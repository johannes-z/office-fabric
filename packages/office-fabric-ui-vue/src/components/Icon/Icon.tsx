import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { IIconProps, IIconStyles } from './Icon.types'
import { getClassNames } from '../../util/getClassNames'
import { CreateElement, RenderContext } from 'vue'

@Component({
  // @ts-ignore
  functional: true,
})
export default class Icon extends BaseComponent {
  @Prop({ type: String, default: '' }) iconName!: string
  @Prop({ type: Object, default: null }) imageProps!: any

  render (h: CreateElement, context: RenderContext) {
    const { className, iconName, theme, styles, imageProps } = context.props

    const isPlaceholder = typeof iconName === 'string' && iconName.length === 0
    const isImage = !!imageProps

    const classNames = getClassNames(styles, {
      theme,
      className,
      iconClassName: ['ms-Icon', `ms-Icon--${iconName}`],
      isImage,
      isPlaceholder,
    })

    return h('i', {
      ...context.data,
      class: classNames.root,
      attrs: {
        'aria-hidden': 'true',
      },
    })
  }
}

import { Component, Prop } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

const getClassNames = classNamesFunction()

@Component
export default class Icon extends StatelessComponent {
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

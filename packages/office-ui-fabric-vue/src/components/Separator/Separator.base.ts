import { Component, Prop } from 'vue-property-decorator'
import { ISeparatorStyles, ISeparatorStyleProps } from './Separator.types'
import { CreateElement, VNode } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>()

@Component
export class SeparatorBase extends StatelessComponent {
  @Prop({ type: String, default: 'center' }) alignContent!: string
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  render (h: CreateElement, context: any): VNode {
    const { styles, theme, className, vertical, alignContent } = context.props

    const classNames = getClassNames(styles, {
      theme,
      className,
      alignContent,
      vertical,
    })

    const $content = h('div', {
      class: classNames.content,
      attrs: {
        role: 'separator',
        'aria-orientation': vertical ? 'vertical' : 'horizontal',
      },
    }, context.children)

    return h('div', { class: classNames.root }, [$content])
  }
}

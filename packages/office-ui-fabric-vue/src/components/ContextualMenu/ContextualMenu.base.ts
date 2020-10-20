import { Vue, Component, Prop } from 'vue-property-decorator'
import { Callout } from '../Callout'
import { DirectionalHint } from '../../common/DirectionalHint'
import { css, classNamesFunction } from '@uifabric-vue/utilities'
import BaseComponent from '../BaseComponent'

import { ContextualMenuItem } from './ContextualMenuItem'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<any, any>({
  disableCaching: true,
})

@Component({
  components: { Callout, ContextualMenuItem },
})
export class ContextualMenuBase extends BaseComponent {
  @Prop() target!: HTMLElement
  @Prop({ type: Object, default: () => {} }) calloutProps!: any
  @Prop({ type: Number, default: DirectionalHint.bottomAutoEdge }) directionalHint!: boolean
  @Prop({ type: Function, default: () => null }) onDismiss!: () => void
  @Prop({ type: Array, default: () => [] }) items!: any[]

  created () {
    console.log(this.target)
  }

  get classNames (): any {
    const { styles, theme, className } = this

    return getClassNames(styles, {
      theme,
      className,
    })
  }

  get contextMenuStyle () {
    const targetBoundingRect = this.target.getBoundingClientRect()
    const targetWidth = targetBoundingRect.width - 2 /* Accounts for 1px border */
    return {
      width: `${targetWidth}px`,
    }
  }

  render (h: CreateElement) {
    const { target, directionalHint, calloutProps, onDismiss, contextMenuStyle, classNames, items } = this

    return h(Callout, {
      class: css('ms-ContextualMenu-Callout', calloutProps && calloutProps.className),
      attrs: {
        target,
        directionalHint,
        isBeakVisible: false,
      },
      on: {
        dismiss: onDismiss,
      },
    }, [
      h('div', { style: contextMenuStyle, class: classNames.container }, [
        h('div', { class: classNames.root }, [
          h('ul', { class: classNames.list, attrs: { role: 'menu' } },
            items.map((item, index) => h('li', {
              key: item.key || index,
              class: classNames.item,
            }, [
              h(ContextualMenuItem, {
                attrs: {
                  item,
                  propClassNames: classNames,
                },
              }),
            ])),
          ),
        ]),
      ]),
    ])
  }
}

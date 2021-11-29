import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import VNodes from '../VNodes'

const getClassNames = classNamesFunction()

@Component
export class DialogFooterBase extends BaseComponent {
  private _classNames: any;

  render (h: CreateElement) {
    const { className, styles, theme } = this

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    })

    return h('div', {
      class: this._classNames.actions,
    }, [
      h('div', {
        class: this._classNames.actionsRight,
      }, this._renderChildrenAsActions(h)),
    ])
  }

  private _renderChildrenAsActions (h) {
    return this.$slots.default?.map(child =>
      child ? h('span', { class: this._classNames.action }, [h(VNodes, { props: { vnodes: child } })]) : null,
    )
  }
}

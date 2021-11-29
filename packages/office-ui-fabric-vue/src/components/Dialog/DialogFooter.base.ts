import { h } from '@/renderFunction'
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
    console.log(this)

    return h('div', {
      class: this._classNames.actions,
    }, [
      h('div', {
        class: this._classNames.actionsRight,
      }, this._renderChildrenAsActions()),
    ])
  }

  private _renderChildrenAsActions () {
    return this.$slots.default?.map(child =>
      child ? h('span', { class: this._classNames.action }, [h(VNodes, { props: { vnodes: child } })]) : null,
    )
  }
}

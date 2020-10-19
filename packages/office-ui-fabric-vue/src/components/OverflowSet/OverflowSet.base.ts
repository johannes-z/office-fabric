import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction } from '@uifabric-vue/utilities'
import BaseComponent from '../BaseComponent'
import { IOverflowSetStyleProps, IOverflowSetStyles, IOverflowSetProps } from './OverflowSet.types'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IOverflowSetStyleProps, IOverflowSetStyles>()

@Component({
  components: {},
})
export class OverflowSetBase extends BaseComponent<IOverflowSetProps> {
  @Prop({ type: Array, default: () => [] }) items!: any[]
  @Prop({ type: Array, default: () => [] }) overflowItems!: any[]
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  get classNames () {
    const { styles, className, vertical } = this
    return getClassNames(styles, { className, vertical })
  }

  render (h: CreateElement) {
    const { classNames, items, overflowItems } = this
    return h('div', { class: classNames.root }, [
      items.map((item, index) => h(
        'div', { class: classNames.item }, [
          this.$scopedSlots.item && this.$scopedSlots.item({ item }),
        ],
      )),
      (overflowItems && overflowItems.length > 0) && h(
        'div', {
          class: classNames.overflowButton,
        }, this.$scopedSlots.overflow && this.$scopedSlots.overflow({ items: overflowItems }),
      ),
    ])
  }
}

import { Vue, Component, Prop } from 'vue-property-decorator'
import { classNamesFunction } from '@uifabric-vue/utilities'
import BaseComponent from '../BaseComponent'
import { IOverflowSetStyleProps, IOverflowSetStyles, IOverflowSetProps } from './OverflowSet.types'

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

  render () {
    const { classNames, items, overflowItems } = this
    return (
      <div class={classNames.root}>
        {items.map((item, index) => (
          <div key={index} class={classNames.item}>
            {this.$scopedSlots.item && this.$scopedSlots.item({ item })}
          </div>
        ))}

        {(overflowItems && overflowItems.length > 0) && (
          <div class={classNames.overflowButton}>
            {this.$scopedSlots.overflow && this.$scopedSlots.overflow({ items: overflowItems })}
          </div>
        )}
      </div>
    )
  }
}

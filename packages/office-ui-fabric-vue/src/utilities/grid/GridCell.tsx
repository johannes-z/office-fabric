import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../components/BaseComponent'

import { ActionButton } from '../../components/Button/'
import { css } from '@uifabric-vue/utilities'

@Component({
  components: { ActionButton },
})
export class GridCell extends BaseComponent {
  @Prop({ type: Object, default: () => {} }) item!: any

  @Prop({ type: Boolean }) disabled!: boolean
  @Prop({ type: Boolean }) selected!: boolean

  @Prop({ type: String }) cellDisabledStyle!: string
  @Prop({ type: String }) cellIsSelectedStyle!: string

  @Prop() getClassNames!: any

  render () {
    const { className, item, cellDisabledStyle, cellIsSelectedStyle, selected, disabled } = this

    return (
      <ActionButton class={css(className, {
        ['' + cellIsSelectedStyle]: selected,
        ['' + cellDisabledStyle]: disabled,
      })}
      getClassNames={this.getClassNames}
      { ...{
        scopedSlots: {
          flex: this.$scopedSlots.default,
        },
      }} />
    )
  }
}

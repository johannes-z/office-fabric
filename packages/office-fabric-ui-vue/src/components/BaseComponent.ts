import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { css } from '@uifabric-vue/utilities'
import { getTheme } from '@uifabric-vue/styling'

// @ts-ignore
@Component
export default abstract class BaseComponent<TProps = {}, IStyles = {}> extends Vue {
  $props!: TProps
  $style!: any

  @Prop({ default: '' }) readonly className?: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles?: any
  @Prop({ type: Object, default: () => getTheme() }) readonly theme!: any

  css = css

  // created () {
  // for (const key in this.$props) {
  //   this.$set(this.props as any, key, this.$props[key])
  // }
  // console.log(this.props)
  // }

  protected get classNames (): IProcessedStyleSet<IStyles> {
    return {} as any
  }
}

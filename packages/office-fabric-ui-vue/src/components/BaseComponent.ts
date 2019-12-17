import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { ITheme } from '@/types/ITheme'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { css } from '@fabric-vue/utilities'
import { defaultTheme } from '@fabric-vue/styling'

// @ts-ignore
@Component
export default abstract class BaseComponent<TProps = {}, IStyles = {}> extends Vue {
  $props!: TProps
  $style!: any

  @Prop({ default: '' }) readonly className?: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles?: any
  // @ts-ignore
  @Prop({ type: Object, default: () => (this ? this.$fabricTheme : defaultTheme) || defaultTheme }) readonly theme!: Itheme

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

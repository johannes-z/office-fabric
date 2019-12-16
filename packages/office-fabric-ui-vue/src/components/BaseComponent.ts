import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { ITheme } from '@/types/ITheme'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { css } from '@fabric-vue/utilities'

interface IBaseProps {
  theme?: ITheme
}

// @ts-ignore
@Component
export default abstract class BaseComponent<TProps = {}, IStyles = {}> extends Vue {
  $props!: TProps
  $style!: any

  // readonly props: TProps = {
  //   theme: this.theme,
  // } as TProps

  @Prop({ default: '' }) readonly className?: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles?: any

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

  get theme (): ITheme {
    // @ts-ignore
    return this.$theme
  }
}

import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { ITheme } from '@/types/ITheme'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { css } from '../utilities'

interface IBaseProps {
  theme?: ITheme
}

// @ts-ignore
@Component
export default abstract class BaseComponent<TProps = {}, IStyles = {}> extends Vue {
  $props!: TProps

  // readonly props: TProps = {
  //   theme: this.theme,
  // } as TProps

  @Prop() readonly className?: string
  // @Prop() readonly styles?: any

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

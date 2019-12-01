import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { ITheme } from '@/types/ITheme'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { css } from '../utilities'

// @ts-ignore
@Component
export default abstract class BaseComponent<IProps = {}, IStyles = {}> extends Vue {
  $style!: { [K in keyof IStyles]: any } & { [key: string]: string }
  $props!: IProps

  @Prop() readonly className?: string

  css = css

  // @Prop({ type: [Array, Object], default: void 0 }) readonly classes?: IStyles
  // @Prop({ type: [Array, Object], default: void 0 }) readonly styles?: IStyles

  abstract get classNames (): IProcessedStyleSet<IStyles>

  // get className (): string | undefined {
  //   console.log(this.$attrs)
  //   return ''
  //   // return this.$attrs.class
  // }

  get theme (): ITheme {
    // @ts-ignore
    return this.$theme
  }
}

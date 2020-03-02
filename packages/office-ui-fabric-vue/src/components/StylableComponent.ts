import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { css } from '@uifabric-vue/utilities'
import { getTheme, ITheme } from '@uifabric/styling'

// @ts-ignore
@Component
export default abstract class StylableComponent extends Vue {
  @Prop({ type: [String, Array], default: '' }) readonly className!: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles!: any
  @Prop({ type: Object, default: () => getTheme() }) readonly theme!: ITheme

  css = css

  protected get classNames (): IProcessedStyleSet<any> {
    return {} as any
  }
}

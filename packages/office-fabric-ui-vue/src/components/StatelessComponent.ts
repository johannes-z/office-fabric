import Vue from 'vue'
import { Prop, Component } from 'vue-property-decorator'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { css } from '@uifabric-vue/utilities'
import { getTheme } from '@uifabric/styling'

@Component({
  // @ts-ignore
  functional: true,
})
export default abstract class StatelessComponent<TProps = {}, IStyles = {}> extends Vue {
  @Prop({ default: '' }) readonly className?: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles?: any
  @Prop({ type: Object, default: () => getTheme() }) readonly theme!: any

  css = css
}

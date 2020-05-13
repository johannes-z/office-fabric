import { Prop, Component } from 'vue-property-decorator'
import { css } from '@uifabric-vue/utilities'
import { getTheme } from '@uifabric/styling'
import { Component as TsxComponent } from 'vue-tsx-support'

// @ts-ignore
@Component({
  // @ts-ignore
  functional: true,
  provide: {},
})
export default abstract class StatelessComponent<TProps = {}> extends TsxComponent<TProps, any, any> {
  @Prop({ type: [String, Array], default: '' }) readonly className!: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles!: any
  @Prop({ type: Object, default: () => getTheme() }) readonly theme!: any

  css () {
    return css(...arguments)
  }
}

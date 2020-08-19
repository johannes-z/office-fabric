import { Vue, Prop, Component } from 'vue-property-decorator'
import { css } from '@uifabric-vue/utilities'
import { getTheme } from '@uifabric/styling'

// @ts-ignore
@Component({
  // @ts-ignore
  functional: true,
  provide: {},
})
export default abstract class StatelessComponent<TProps = {}> extends Vue {
  @Prop({ type: [String, Array], default: '' }) readonly className!: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles!: any
  @Prop({ type: Object, default: () => getTheme() }) readonly theme!: any

  css () {
    return css(...arguments)
  }
}

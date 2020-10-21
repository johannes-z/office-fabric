import { getTheme, ITheme } from '@uifabric/styling'
import { CreateElement } from 'vue'
import { Vue, Prop, Component, ProvideReactive } from 'vue-property-decorator'

@Component({
  inject: [],
})
export class ThemeProvider extends Vue {
  @ProvideReactive()
  @Prop({ type: Object, default: () => getTheme() }) theme!: ITheme

  render (h: CreateElement) {
    if (!this.$slots.default) return h('div')
    // @ts-ignore
    return this.$slots.default.length === 1
      ? this.$slots.default[0]
      : h('div', this.$slots.default)
  }
}

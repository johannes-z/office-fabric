import { Prop, Component, InjectReactive } from 'vue-property-decorator'
import { getTheme, ITheme } from '@uifabric/styling'
import Vue from 'vue'

// @ts-ignore
@Component({
  // @ts-ignore
  functional: true,
})
export default abstract class StatelessComponent<TProps = {}> extends Vue {
  @Prop({ type: [String, Array], default: '' }) readonly className!: string
  @Prop({ type: [Object, Function], default: () => {} }) readonly styles!: any
  @Prop({ type: Object, default: () => getTheme() }) readonly theme!: ITheme
}

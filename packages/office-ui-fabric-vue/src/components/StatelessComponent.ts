import { Prop, Component } from 'vue-property-decorator'
import { getTheme } from '../plugin/getTheme'
import Vue from 'vue'

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
}

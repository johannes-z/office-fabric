import { Check } from '../../Check'
import { CreateElement } from 'vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export class DetailsRowCheckBase extends Vue {
  @Prop({ type: Boolean, default: false })selected!: boolean

  render (h: CreateElement) {
    return h(Check, {
      attrs: {
        checked: this.selected,
      },
    })
  }
}

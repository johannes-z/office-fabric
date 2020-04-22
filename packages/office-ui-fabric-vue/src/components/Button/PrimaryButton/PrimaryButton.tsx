import { Vue, Component, Prop } from 'vue-property-decorator'
import { DefaultButton } from '../DefaultButton/DefaultButton'

@Component
export class PrimaryButton extends DefaultButton {
  @Prop({ type: Boolean, default: true }) primary!: boolean
}

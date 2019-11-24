import { Vue, Prop } from 'vue-property-decorator'

export default abstract class BaseButton extends Vue {
  @Prop({ type: Boolean, default: false }) primary!: boolean
  @Prop({ type: Boolean, default: false }) checked!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean
}

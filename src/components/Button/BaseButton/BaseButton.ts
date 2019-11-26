import { Vue, Prop } from 'vue-property-decorator'

export default abstract class BaseButton extends Vue {
  @Prop({ default: false }) primary!: boolean
  @Prop({ default: false }) checked!: boolean
  @Prop({ default: false }) disabled!: boolean

  @Prop({ default: null }) href?: string
}

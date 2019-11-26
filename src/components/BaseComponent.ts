import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { mergeStyleClasses } from '@/util/mergeStyleClasses'

export default abstract class BaseComponent<IProps = {}, IClasses = {}> extends Vue {
  $style!: IClasses & { [key: string]: string | undefined }
  $props!: IProps

  @Prop({ default: void 0 }) cssClasses!: IClasses

  protected abstract get classes (): IClasses

  get classNames (): IClasses {
    return mergeStyleClasses(this.classes, this.cssClasses)
  }
}

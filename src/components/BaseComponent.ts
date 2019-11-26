import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import merge from 'lodash.merge'

export default abstract class BaseComponent<
  IProps = {},
  IClassProps = {}
> extends Vue {
  $props!: IProps

  @Prop({ default: void 0 }) cssClasses!: IClassProps

  protected abstract get classes (): IClassProps

  get classNames (): IClassProps {
    return merge(this.classes, this.cssClasses)
  }
}

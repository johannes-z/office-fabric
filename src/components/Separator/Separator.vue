<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ISeparatorProps, ISeparatorStyles } from './Separator.types'
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Separator.styles'
import { CreateElement, VNode } from 'vue'

const verticalAlignment: any = {
  center: 'middle',
  start: 'top',
  end: 'bottom',
}

@Component({
  // @ts-ignore
  functional: true,
})
export default class Separator extends BaseComponent<ISeparatorProps, ISeparatorStyles> {
  @Prop({ type: String, default: 'center' }) alignContent!: string
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  render (h: CreateElement, context: any): VNode {
    const classNames = getClassNames(getStyles, {
      theme: context.parent.$theme,
      className: context.data.attrs ? context.data.attrs.class : '',
      alignContent: context.props.alignContent,
      vertical: context.props.vertical,
    })
    return (
      <div class={classNames.root}>
        <div class={classNames.content}>
          {context.children}
        </div>
      </div>
    )
  }

  // get classNames () {
  //   return getClassNames(getStyles, {
  //     theme: this.theme,
  //     className: this.$attrs.class,
  //     alignContent: this.alignContent,
  //     vertical: this.vertical,
  //   })
  // }
}
</script>

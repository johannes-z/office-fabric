<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ISeparatorProps, ISeparatorStyles } from './Separator.types'
import { CreateElement, VNode } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction()

const verticalAlignment: any = {
  center: 'middle',
  start: 'top',
  end: 'bottom',
}

@Component({
  // @ts-ignore
  functional: true,
})
export default class Separator extends BaseComponent {
  @Prop({ type: String, default: 'center' }) alignContent!: string
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  render (h: CreateElement, context: any): VNode {
    const classNames = getClassNames(context.props.styles, {
      theme: context.props.theme,
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
}
</script>

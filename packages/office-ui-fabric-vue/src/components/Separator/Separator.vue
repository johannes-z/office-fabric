<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ISeparatorProps, ISeparatorStyles, ISeparatorStyleProps } from './Separator.types'
import { CreateElement, VNode } from 'vue'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'

const getClassNames = classNamesFunction<ISeparatorStyleProps, ISeparatorStyles>()

const verticalAlignment: any = {
  center: 'middle',
  start: 'top',
  end: 'bottom',
}

@Component
export default class Separator extends StatelessComponent {
  @Prop({ type: String, default: 'center' }) alignContent!: string
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  render (h: CreateElement, context: any): VNode {
    const { styles, theme, className, vertical, alignContent } = context.props
    const classNames = getClassNames(styles, {
      theme,
      className,
      alignContent,
      vertical,
    })
    return (
      <div class={classNames.root}>
        <div class={classNames.content} role="separator" aria-orientation={vertical ? 'vertical' : 'horizontal'}>
          {context.children}
        </div>
      </div>
    )
  }
}
</script>

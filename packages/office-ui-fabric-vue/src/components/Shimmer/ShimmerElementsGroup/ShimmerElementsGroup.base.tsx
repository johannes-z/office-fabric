import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../../StatelessComponent'
import { Component } from 'vue-property-decorator'
import { CreateElement, RenderContext } from 'vue'
import { ShimmerElementsDefaultHeights } from '../Shimmer.types'
import { ShimmerLine } from '../ShimmerLine/ShimmerLine'

const getClassNames = classNamesFunction()

@Component
export default class ShimmerElementsGroupBase extends StatelessComponent {
  // @Prop()

  render (h: CreateElement, ctx: RenderContext) {
    const {
      styles,
      theme,
    } = ctx.props
    const classNames: any = getClassNames(styles, {
      theme,
    })

    return (
      <div class={classNames.root}>
        <ShimmerLine height={ShimmerElementsDefaultHeights.line} />
      </div>
    )
  }
}

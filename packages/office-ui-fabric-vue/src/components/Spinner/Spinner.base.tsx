import { Component, Prop } from 'vue-property-decorator'
import { classNamesFunction } from '@uifabric-vue/utilities'
import StatelessComponent from '../StatelessComponent'
import { CreateElement, RenderContext } from 'vue'
import { ISpinnerProps, SpinnerLabelPosition } from './Spinner.types'
import { DelayedRender } from '../DelayedRender'

const getClassNames = classNamesFunction()

@Component
export default class Spinner extends StatelessComponent<ISpinnerProps> {
  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: String, default: null }) ariaLabel!: string
  @Prop({ type: String, default: 'polite', validator: v => ['assertive', 'polite', 'off'].indexOf(v) > -1 }) ariaLive!: string
  @Prop({ type: String, default: 'bottom' }) labelPosition!: SpinnerLabelPosition
  @Prop({ type: Number, default: 20 }) size!: number

  render (h: CreateElement, context: RenderContext) {
    const { theme, styles, className, ariaLabel, ariaLive, size, label, labelPosition } = context.props
    const statusMessage = ariaLabel
    const classNames: any = getClassNames(styles, {
      theme,
      size,
      className,
      labelPosition,
    })

    return (
      <div class={classNames.root}>
        <div class={classNames.circle} />
        {(context.scopedSlots.default || label) && (
          <div class={classNames.label}>
            {context.scopedSlots.default
              ? context.scopedSlots.default({})
              : label
            }
          </div>
        ) }

        {statusMessage && (
          <div role="status" aria-live={ariaLive}>
            <DelayedRender>
              <div class={classNames.screenReaderText}>{statusMessage}</div>
            </DelayedRender>
          </div>
        )}
      </div>
    )
  }
}

import { type PropType, type VNode, type VNodeArrayChildren, computed, defineComponent, h, toRefs } from 'vue'
import { classNamesFunction, divProperties, getNativeProps } from '@fluentui-vue/utilities'
import { Callout, DirectionalHint, type ICalloutProps } from '..'
import type { ITooltipProps, ITooltipStyles } from '.'
import { makeStylingProps } from '@/utils'

const getClassNames = classNamesFunction<ITooltipProps, ITooltipStyles>()

export type TooltipSlotChildren = string | JSX.Element | JSX.Element[] | undefined

const TOOLTIP_DEFAULTS: Partial<ITooltipProps> = {
  directionalHint: DirectionalHint.topCenter,
  maxWidth: '364px',
  calloutProps: {
    isBeakVisible: true,
    beakWidth: 16,
    gapSpace: 0,
    setInitialFocus: true,
    doNotLayer: false,
  },
}

export const TooltipBase = defineComponent({
  name: 'TooltipBase',

  props: {
    ...makeStylingProps(),
    calloutProps: { type: Object as PropType<ICalloutProps>, default: TOOLTIP_DEFAULTS.calloutProps },
    content: { type: Object as PropType<TooltipSlotChildren>, default: undefined },
    directionalHint: { type: Number as () => DirectionalHint, default: TOOLTIP_DEFAULTS.directionalHint },
    directionalHintForRTL: { type: Number as () => DirectionalHint, default: undefined },
    maxWidth: { type: String, default: TOOLTIP_DEFAULTS.maxWidth },
    targetElement: { type: Object as PropType<HTMLElement>, default: undefined },
    onFocus: { type: Function as PropType<(ev: FocusEvent) => void>, default: undefined },
    onMouseEnter: { type: Function as PropType<(ev: MouseEvent) => void>, default: undefined },
    onMouseLeave: { type: Function as PropType<(ev: MouseEvent) => void>, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const {
      className,
      calloutProps,
      directionalHint,
      directionalHintForRTL,
      styles,
      maxWidth,
      // onRenderContent = this._onRenderContent,
      targetElement,
      content,
      theme,
      onFocus,
      onMouseEnter,
      onMouseLeave,
    } = toRefs(props)

    const classNames = computed(() => getClassNames(styles.value!, {
      theme: theme.value!,
      className: className.value || (calloutProps.value && calloutProps.value.className),
      beakWidth: calloutProps.value && calloutProps.value.isBeakVisible ? calloutProps.value.beakWidth : 0,
      gapSpace: calloutProps.value && calloutProps.value.gapSpace,
      maxWidth: maxWidth.value!,
    }))

    const onRenderContent = (): TooltipSlotChildren => {
      if (slots?.content)
        return slots?.content?.(props, onRenderContent)

      if (typeof content.value === 'string')
        return h('p', { class: classNames.value.subText }, content.value)

      else
        return h('div', { class: classNames.value.subText }, content.value)
    }

    return () => h(Callout, {
      target: targetElement.value,
      directionalHint: directionalHint.value,
      directionalHintForRTL: directionalHintForRTL.value,
      ...calloutProps.value,
      ...getNativeProps(props, divProperties, ['id']), // omitting ID due to it being used in the div below
      className: classNames.value.root,
    }, [
      h('div', {
        class: classNames.value.content,
        id: attrs.id,
        onFocus: onFocus.value,
        onMouseEnter: onMouseEnter.value,
        onMouseLeave: onMouseLeave.value,
      }, onRenderContent()),
    ])
  },
})

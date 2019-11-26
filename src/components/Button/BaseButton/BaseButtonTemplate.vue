<script lang="ts">
import { Prop, Component } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue'
import BaseButton from './BaseButton'

@Component({
  // @ts-ignore
  functional: true,
})
export default class BaseButtonTemplate extends BaseButton {
  render (h: CreateElement, context: any): VNode {
    const { props } = context
    return h(props.href ? 'a' : 'button', {
      ...context,
      class: [
        'ms-Button',
        context.$style.root,
        props.primary && context.$style.primary,
        props.disabled && context.$style.disabled,
        props.checked && context.$style.checked,
        context.data.class,
      ],
      attrs: {
        ...context.attrs,
        ...context.props,
      },
    }, context.children)
  }
}
</script>

<style lang="scss" module>
@import "./BaseButton";
</style>

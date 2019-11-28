<template>
  <div v-bind="css.root">
    <div v-bind="css.wrapper">
      <Label v-if="label"
             v-bind="css.label"
             :for="`TextField${_uid}`"
             :required="required"
             v-text="label" />
      <div v-bind="css.fieldGroup">
        <component :is="multiline ? 'textarea' : 'input'"
                   :id="`TextField${_uid}`"
                   ref="textElement"
                   :value="internalValue"
                   v-bind="[$attrs, css.field]"
                   :disabled="disabled"
                   :readonly="readonly"
                   :required="required"
                   :placeholder="placeholder"
                   :rows="$attrs.rows || 1"
                   type="text"
                   autocomplete="off"
                   :style="{ resize: (resizable === false) && 'none' }"
                   @focus="isActive = true"
                   @blur="isActive = false"
                   @input="internalValue = $event.target.value"
                   v-text="internalValue" />
      </div>
    </div>
    <div v-if="errorMessage" v-bind="css.description">
      <div role="alert">
        <p v-bind="css.errorMessage">
          <span>{{ errorMessage }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Model, Watch } from 'vue-property-decorator'
import Label from '@/components/Label/Label.vue'
import { ITextFieldProps, ITextFieldStyles } from './TextField.types'
import BaseComponent from '../BaseComponent'

@Component({
  components: { Label },
  inheritAttrs: false,
})
export default class TextField extends BaseComponent<ITextFieldProps, ITextFieldStyles> {
  $refs!: {
    textElement: HTMLTextAreaElement | HTMLInputElement
  }
  @Prop({ default: false }) multiline!: boolean
  @Prop({ default: null }) resizable!: boolean
  @Prop({ default: null }) autoAdjustHeight!: boolean

  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) readonly!: boolean
  @Prop({ default: false }) required!: boolean
  @Prop({ default: null }) label!: string
  @Prop({ default: '' }) value!: string
  @Prop({ default: null }) errorMessage!: string
  @Prop({ default: null }) placeholder!: string
  @Prop({ default: null }) description!: string

  isActive: boolean = false
  internalValue: string = this.value

  get baseStyles (): ITextFieldStyles {
    const { $style, multiline, isActive, disabled, errorMessage } = this
    return {
      root: [
        'ms-TextField',
        $style.root,
        multiline && $style.multiline,
        isActive && $style.active,
        disabled && $style.disabled,
        errorMessage && $style.hasError,
      ],
      wrapper: [
        'ms-TextField-wrapper',
        $style.wrapper,
      ],
      label: [
        $style.label,
      ],
      fieldGroup: [
        'ms-TextField-fieldGroup',
        $style.fieldGroup,
      ],
      prefix: [

      ],
      suffix: [

      ],
      field: [
        'ms-TextField-field',
        $style.field,
      ],
      icon: [

      ],
      description: [
        $style.description,
      ],
      errorMessage: [
        'ms-TextField-errorMessage',
        $style.errorMessage,
      ],
    }
  }

  mounted () {
    this.adjustInputHeight()
  }

  updated () {
    this.adjustInputHeight()
  }

  @Watch('value')
  private onPropValueChanged (newValue: string) {
    this.internalValue = newValue
  }

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }

  @Watch('multiline')
  private async onMultilineChanged (newValue: boolean, oldValue: boolean) {
    const textElement = this.$refs.textElement
    const start = textElement.selectionStart || 0
    const end = textElement.selectionEnd || 0
    if ((newValue !== oldValue) && this.isActive) {
      await this.$nextTick()
      this.$refs.textElement.focus()
      this.$refs.textElement.setSelectionRange(start, end)
    }
  }

  private adjustInputHeight (): void {
    if (this.$refs.textElement && this.autoAdjustHeight && this.multiline) {
      const textField = this.$refs.textElement
      textField.style.height = ''
      textField.style.height = textField.scrollHeight + 'px'
    }
  }
}
</script>

<style lang="scss" module>
.root {
  box-shadow: none;
  box-sizing: border-box;
  position: relative;

  &.disabled {
    .label {
      color: rgb(161, 159, 157);
    }
    .fieldGroup {
      background: rgb(255, 255, 255);
      border-color: rgb(243, 242, 241);
    }
    .field {
      color: rgb(161, 159, 157);
      background: none rgb(243, 242, 241);
      border-color: rgb(243, 242, 241);
    }
  }

  &.active {
    .fieldGroup {
      border-width: 1px;
      border-style: solid;
      border-image: initial;
      border-radius: 2px;
      background: rgb(255, 255, 255);
      border-color: rgb(0, 120, 212);

      &:after {
        pointer-events: none;
        content: "";
        position: absolute;
        left: -1px;
        top: -1px;
        bottom: -1px;
        right: -1px;
        border-width: 2px;
        border-style: solid;
        border-color: rgb(0, 120, 212);
        border-image: initial;
        border-radius: 2px;
      }
    }
  }
}
.label + .fieldGroup {
  &:before {
    content: "";
  }
}
.fieldGroup {
  box-shadow: none;
  box-sizing: border-box;
  cursor: text;
  min-height: 32px;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(138, 136, 134);
  border-image: initial;
  border-radius: 2px;
  background: rgb(255, 255, 255);

  &:hover {
    border-color: rgb(50, 49, 48);
  }

  &:before {
    content: "*";
    color: rgb(164, 38, 44);
    position: absolute;
    top: -5px;
    right: -10px;
  }
}
.field {
  font-size: 14px;
  font-weight: 400;
  box-shadow: none;
  padding: 0 8px;
  box-sizing: border-box;
  color: rgb(50, 49, 48);
  width: 100%;
  min-width: 0px;
  text-overflow: ellipsis;
  border-radius: 0px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
  background: none transparent;
  outline: 0px;
}

.root.hasError {
  .fieldGroup {
    border-color: rgb(164, 38, 44);

    &:after {
      border-color: rgb(164, 38, 44);
    }
  }
}

.errorMessage {
  animation-name: css-0, css-13;
  animation-duration: 0.367s;
  animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
  animation-fill-mode: both;
  font-size: 12px;
  font-weight: 400;
  color: rgb(164, 38, 44);
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 5px;
  display: flex;
  align-items: center;
}

.root.multiline {
  .field {
    min-height: 32px;
    padding: 6px 8px;
    resize: vertical;
  }
}
</style>

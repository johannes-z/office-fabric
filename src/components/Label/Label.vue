<template>
  <label v-bind="css.root">
    <slot />
  </label>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ILabelProps, ILabelStyles } from './Label.types'

@Component({
  name: 'o-label',
})
export default class Label extends BaseComponent<ILabelProps, ILabelStyles> {
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) required!: boolean

  get baseStyles (): ILabelStyles {
    const { $style, disabled, required } = this
    return {
      root: [
        'ms-Label',
        $style.root,
        disabled && $style.disabled,
        required && $style.required,
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
  font-size: 14px;
  font-weight: 600;
  color: var(--fabric-neutralPrimary);
  box-sizing: border-box;
  box-shadow: none;
  margin: 0;
  display: block;
  padding: 5px 0;
  overflow-wrap: break-word;
}

.root.disabled {
  color: var(--fabric-neutralSecondary);
}

.required:after {
  content: " *";
  color: var(--fabric-error);
  padding-right: 12px;
}
</style>

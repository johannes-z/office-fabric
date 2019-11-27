<template>
  <div v-bind="css.root">
    <div v-bind="css.circle" />
    <div v-if="$slots.default || label"
         v-bind="css.label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ISpinnerProps, ISpinnerStyles } from './Spinner.types'
import BaseComponent from '../BaseComponent'

@Component({
  name: 'o-spinner',
})
export default class Spinner extends BaseComponent<ISpinnerProps, ISpinnerStyles> {
  @Prop({ default: null }) labelPosition!: string
  @Prop({ default: null }) label!: string
  @Prop({ default: 20 }) size!: number

  get baseStyles (): ISpinnerStyles {
    const { $style } = this
    return {
      root: [
        'ms-Spinner',
        $style.root,
        {
          flexDirection:
            (this.labelPosition === 'top' && 'column-reverse') ||
            (this.labelPosition === 'right' && 'row') ||
            (this.labelPosition === 'left' && 'row-reverse'),
        },
      ],
      circle: [
        'ms-Spinner-circle',
        $style.circle,
        {
          width: `${this.size}px`,
          height: `${this.size}px`,
        },
      ],
      label: [
        'ms-Spinner-label',
        $style.label,
        {
          marginTop: this.labelPosition == null && '8px',
          marginBottom: this.labelPosition === 'top' && '8px',
          marginLeft: this.labelPosition === 'right' && '8px',
          marginRight: this.labelPosition === 'left' && '8px',
        },
      ],
    }
  }
}
</script>

<style lang="scss" module>
@keyframes SpinAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.root {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.circle {
  box-sizing: border-box;
  animation-name: SpinAnimation;
  animation-duration: 1.3s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.53, 0.21, 0.29, 0.67);
  border-radius: 50%;
  border-width: 1.5px;
  border-style: solid;
  border-color: rgb(0, 120, 212) rgb(199, 224, 244) rgb(199, 224, 244);
  border-image: initial;
}

.label {
  font-size: 12px;
  font-weight: 400;
  color: rgb(0, 120, 212);
  text-align: center;
}
</style>

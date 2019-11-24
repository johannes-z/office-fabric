<template>
  <div :class="[$style.root]" :style="labelPositionStyle">
    <div :class="$style.circle" :style="sizeStyle" />
    <div v-if="$slots.default || label"
         :class="$style.label"
         :style="marginStyle">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Spinner extends Vue {
  @Prop({
    default: 'md',
    validator: v => ['xs', 'sm', 'md', 'lg'].indexOf(v) > -1,
  }) size!: string
  @Prop({ default: null }) labelPosition!: string
  @Prop({ default: null }) label!: string

  get sizeStyle () {
    if (this.size === 'xs') return { width: `12px`, height: `12px` }
    if (this.size === 'sm') return { width: `16px`, height: `16px` }
    if (this.size === 'md') return { width: `20px`, height: `20px` }
    if (this.size === 'lg') return { width: `28px`, height: `28px` }
  }

  get labelPositionStyle () {
    return {
      'flex-direction':
        (this.labelPosition === 'top' && 'column-reverse') ||
        (this.labelPosition === 'right' && 'row') ||
        (this.labelPosition === 'left' && 'row-reverse'),
    }
  }

  get marginStyle () {
    return {
      'margin-top': this.labelPosition == null && '8px',
      'margin-bottom': this.labelPosition === 'top' && '8px',
      'margin-left': this.labelPosition === 'right' && '8px',
      'margin-right': this.labelPosition === 'left' && '8px',
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

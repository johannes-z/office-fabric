<template>
  <div :class="$style.callout" :style="{ left: left, top: top }">
    <div :class="$style.calloutMain">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class CalloutContent extends Vue {
  @Prop({ type: HTMLElement, required: true }) target!: HTMLElement

  created () {
    console.log(this.target)
  }

  get targetRect (): ClientRect {
    return this.target.getBoundingClientRect()
  }

  get top () {
    return this.targetRect.top + 'px'
  }

  get left () {
    return this.targetRect.left + 'px'
  }
}
</script>

<style lang="scss" module>
.callout {
  position: absolute;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.133) 0px 6.4px 14.4px 0px, rgba(0, 0, 0, 0.11) 0px 1.2px 3.6px 0px;
  max-width: 300px;
  border-radius: 2px;
  outline: transparent;
}
.calloutMain {
  outline: none;
  background-color: rgb(255, 255, 255);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  border-radius: 2px;
}
</style>

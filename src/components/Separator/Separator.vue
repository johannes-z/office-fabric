<template>
  <div :class="[
         $style.root,
         vertical && $style.vertical
       ]"
       :style="styleObj">
    <div :class="$style.content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

const verticalAlignment: any = {
  center: 'middle',
  start: 'top',
  end: 'bottom',
}

@Component
export default class Separator extends Vue {
  @Prop({ type: String, default: 'center' }) alignContent!: string
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  get styleObj () {
    if (this.vertical) {
      return {
        'vertical-align': verticalAlignment[this.alignContent],
      }
    } else {
      return {
        'text-align': this.justifyContent,
      }
    }
  }

  get justifyContent () {
    const alignContent = this.alignContent
    if (alignContent === 'center') return alignContent
    if (alignContent === 'start') return 'start'
    if (alignContent === 'end') return 'end'
    return 'center'
  }
}
</script>

<style lang="scss" module>
.root {
  font-size: 14px;
  font-weight: 400;
  position: relative;

  &:not(.vertical) {
    padding-top: 4px;
    padding-right: 0px;
    padding-bottom: 4px;
    padding-left: 0px;

    &:before {
      background-color: rgb(243, 242, 241);
      height: 1px;
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      bottom: 0px;
      left: 0px;
      right: 0px;
    }
  }

  &.vertical {
    vertical-align: middle;
    padding-top: 0px;
    padding-right: 4px;
    padding-bottom: 0px;
    padding-left: 4px;
    height: inherit;
    display: table-cell;
    z-index: 1;

    &:after {
      background-color: rgb(243, 242, 241);
      width: 1px;
      content: "";
      position: absolute;
      top: 0px;
      bottom: 0px;
      left: 50%;
      right: 0px;
      z-index: -1;
    }
  }
}

.vertical {
  .content {
    padding-top: 12px;
    padding-right: 0px;
    padding-bottom: 12px;
    padding-left: 0px;
  }
}

.content {
  position: relative;
  display: inline-block;
  padding-top: 0px;
  padding-right: 12px;
  padding-bottom: 0px;
  padding-left: 12px;
  color: rgb(50, 49, 48);
  background: rgb(255, 255, 255);
}
</style>

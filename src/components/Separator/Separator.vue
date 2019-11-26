<template>
  <div :class="classNames.root"
       :style="{
         '--verticalAlign': verticalAlignment,
         '--textAlign': justifyContent
       }">
    <div :class="classNames.content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { ISeparatorProps, ISeparatorStyles } from './Separator.types'

const verticalAlignment: any = {
  center: 'middle',
  start: 'top',
  end: 'bottom',
}

@Component({
  name: 'o-separator',
})
export default class Separator extends BaseComponent<ISeparatorProps, ISeparatorStyles> {
  @Prop({ type: String, default: 'center' }) alignContent!: string
  @Prop({ type: Boolean, default: false }) vertical!: boolean

  protected get classes (): ISeparatorStyles {
    return {
      root: [
        'ms-Separator',
        this.$style.root,
        this.vertical && this.$style.vertical,
      ],
      content: [
        this.$style.content,
      ],
    }
  }

  get verticalAlignment () {
    if (!this.vertical) return null
    return verticalAlignment[this.alignContent]
  }

  get justifyContent () {
    if (this.vertical) return null
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
  vertical-align: var(--verticalAlign, middle);
  text-align: var(--textAlign);

  &:before,
  &:after {
    background-color: rgb(243, 242, 241);
    position: absolute;
  }

  &:not(.vertical) {
    padding-top: 4px;
    padding-right: 0px;
    padding-bottom: 4px;
    padding-left: 0px;

    &:before {
      height: 1px;
      content: "";
      display: block;
      top: 50%;
      bottom: 0px;
      left: 0px;
      right: 0px;
    }
  }

  &.vertical {
    padding-top: 0px;
    padding-right: 4px;
    padding-bottom: 0px;
    padding-left: 4px;
    height: inherit;
    display: table-cell;
    z-index: 1;

    &:after {
      width: 1px;
      content: "";
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

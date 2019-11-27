<template>
  <div v-bind="css.root"
       @click="internalChecked = !internalChecked">
    <slot name="label"
          :checked="internalChecked"
          :disabled="disabled"
          :label="label">
      <Label v-bind="css.label"
             v-text="label" />
    </slot>
    <div v-bind="css.container">
      <button v-bind="css.pill">
        <div v-bind="css.thumb" />
      </button>
      <Label v-bind="css.text">
        {{ internalChecked ? onText : offText }}
      </Label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Model } from 'vue-property-decorator'
import Label from '../Label/Label.vue'
import BaseComponent from '../BaseComponent'
import { IToggleProps, IToggleStyles } from './Toggle.types'

@Component({
  name: 'o-toggle',
  components: { Label },
})
export default class Toggle extends BaseComponent<IToggleProps, IToggleStyles> {
  @Model('input', { default: false }) checked!: boolean
  @Prop({ default: '' }) label!: string
  @Prop({ default: false }) defaultChecked!: boolean
  @Prop({ default: false }) disabled!: boolean
  @Prop({ default: false }) inlineLabel!: boolean

  @Prop({ default: null }) onText!: string
  @Prop({ default: null }) offText!: string

  internalChecked: boolean = this.defaultChecked || this.checked

  get baseStyles (): IToggleStyles {
    const { $style, disabled, inlineLabel, internalChecked, onText, offText } = this
    return {
      root: [
        'ms-Toggle',
        $style.root,
        internalChecked && ['is-checked', $style.checked],
        disabled ? ['is-disabled', $style.disabled] : 'is-enabled',
        inlineLabel && $style.inlineLabel,
      ],
      label: [
        'ms-Toggle-label',
        $style.label,
        { '--order': (!onText && !offText) ? 1 : 0 },
      ],
      container: [
        'ms-Toggle-innerContainer',
        $style.container,
      ],
      pill: [
        'ms-Toggle-background',
        $style.pill,
      ],
      thumb: [
        'ms-Toggle-thumb',
        $style.thumb,
      ],
      text: [
        'ms-Toggle-stateText',
        $style.text,
      ],
    }
  }

  @Watch('internalChecked')
  private onCheckedChanged (checked: boolean) {
    this.$emit('input', checked)
  }
}
</script>

<style lang="scss" module>
.root {
  margin-bottom: 8px;
  align-items: center;
}
.container {
  display: inline-flex;
  position: relative;
}
.pill {
  width: 40px;
  height: 20px;
  cursor: pointer;
  display: flex;
  align-self: center;
  align-items: center;
  padding: 0 3px;
  outline: transparent;
  border-radius: 10px;
  transition: all 0.1s ease 0s;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: transparent;
}
.thumb {
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border-radius: 50%;
  transition: all 0.1s ease 0s;
  border-width: 0.28em;
  border-style: solid;
  border-color: transparent;
}
.text {
  padding: 0;
  margin: 0 8px;
  font-weight: 400;
  user-select: none;
}
.label {
  order: var(--order);
}
.root.inlineLabel {
  display: flex;
  align-items: center;

  .label {
    margin-right: 16px;
  }
}

.root.checked {
  .pill {
    justify-content: flex-end;
    background: var(--fabric-themePrimary);
  }
  .thumb {
    background-color: var(--fabric-white);
  }
  &:hover {
    .pill {
      background-color: var(--fabric-themeDarkAlt);
    }
  }
}
.root:not(.checked) {
  .pill {
    border-color: var(--fabric-neutralDark);
    background: var(--fabric-white);
  }
  .thumb {
    background-color: var(--fabric-neutralDark);
  }
  &:hover {
    .pill {
      border-color: var(--fabric-black);
    }
    .thumb {
      background-color: var(--fabric-black);
    }
  }
}
.root.disabled {
  pointer-events: none;
  &.checked .pill {
    background: var(--fabric-neutralTertiaryAlt);
    border-color: transparent;
  }
  &.checked .thumb {
    background-color: var(--fabric-neutralLighter);
  }
  .pill {
    background: var(--fabric-white);
    border-color: var(--fabric-neutralTertiaryAlt);
  }
  .thumb {
    background-color: var(--fabric-neutralTertiaryAlt);
  }
  .label,
  .text {
    color: var(--fabric-neutralSecondary);
  }
}
</style>

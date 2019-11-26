<template>
  <div
    :class="[isActive && $style.active,
             $style.root,
             underlined && $style.underlined,
             disabled && $style.disabled ]">
    <div
      role="search"
      :class="[$style.iconContainer,
               disableAnimation !== true && $style.animation,
               disabled && $style.disabled]"
      :style="{ width: isActive || internalValue ? '4px' : '32px' }">
      <Icon
        :icon-name="iconName"
        :style="{ opacity: isActive || internalValue ? 0 : 1 }"
        :class="[$style.icon,
                 disableAnimation !== true && $style.animation]" />
    </div>
    <input
      ref="input"
      v-bind="$attrs"
      :disabled="disabled"
      :value="internalValue"
      :class="[$style.field, 'ms-SearchBox-field']"
      :area-label="placeholder"
      :placeholder="placeholder"
      @input="internalValue = $event.target.value"
      @focus="isActive = true"
      @blur="isActive = false"
      @keydown.enter="submit"
      @keydown.esc="clearInput">
    <div
      v-if="internalValue"
      :class="[$style.clearButton, 'ms-SearchBox-clearButton']">
      <IconButton icon-name="Clear" @click.native="clearInput" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Icon from '../Icon/Icon.vue'
import IconButton from '../Button/IconButton.vue'
@Component({
  name: 'OSearchBox',
  components: { Icon, IconButton },
  inheritAttrs: false,
})
export default class SearchBox extends Vue {
  $refs!: {
    input: HTMLInputElement
  }
  @Prop({ default: false }) underlined?: boolean
  @Prop({ default: null }) defaultValue?: string
  @Prop({ default: 'Search' }) placeholder?: string
  @Prop({ default: null }) value!: string
  @Prop({ default: false }) disableAnimation?: boolean
  @Prop({ default: false }) disabled?: boolean
  @Prop({ default: 'Search' }) iconName!: string

  isActive: boolean = false
  internalValue: string = this.value

  @Watch('value')
  private onPropValueChanged (newValue: string) {
    this.internalValue = newValue
  }

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }

  submit () {
    this.$emit('submit', this.internalValue)
  }
  clearInput () {
    this.internalValue = ''
    this.$refs.input.focus()
  }
}
</script>

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  box-shadow: none;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  padding-top: 1px;
  padding-right: 0px;
  padding-bottom: 1px;
  padding-left: 4px;
  box-sizing: border-box;
  color: rgb(50, 49, 48);
  background-color: rgb(255, 255, 255);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: stretch;
  height: 32px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(138, 136, 134);
  border-image: initial;

  &.disabled {
    background-color: rgb(243, 242, 241);
    pointer-events: none;
    cursor: default;
    border-color: rgb(243, 242, 241);
  }
  &:hover {
    border-color: rgb(50, 49, 48);
  }
  &.active {
    border-color: rgb(0, 120, 212);
  }
  &.underlined {
    border-radius: 0px;
    border-style: solid;
    background-color: rgb(255, 255, 255);
    border-color: rgb(138, 136, 134);
    border-width: 0px 0px 1px;
  }
}

.iconContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
  width: 32px;
  text-align: center;
  color: rgb(0, 120, 212);
  cursor: text;
  &.disabled {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
    width: 32px;
    text-align: center;
    color: rgb(161, 159, 157);
    cursor: text;
    transition: width 0.167s ease 0s;
  }
  &.animation {
    transition: width 0.167s ease 0s;
  }
}

.field {
    box-shadow: none;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0.5px;
    padding-left: 0px;
    box-sizing: border-box;
    background-color: transparent;
    font-weight: inherit;
    font-family: inherit;
    font-size: inherit;
    color: rgb(50, 49, 48);
    min-width: 0px;
    text-overflow: ellipsis;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    outline: none;
    flex: 1 1 0px;
    overflow: hidden;
}
.icon {
  display: inline-block;
  -webkit-font-smoothing: antialiased;
  font-style: normal;
  font-weight: normal;
  speak: none;
  font-family: FabricMDL2Icons;
  opacity: 1;
  &.animation {
    transition: opacity 0.167s ease 0s;
  }
}
.clearButton {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    cursor: pointer;
    flex-basis: 32px;
    flex-shrink: 0;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    margin-top: -1px;
    margin-right: 0px;
    margin-bottom: -1px;
    margin-left: 0px;
    :global(.ms-Button) {
      border-radius: 0px 1px 1px 0px;
      height: auto;
    }
}
</style>

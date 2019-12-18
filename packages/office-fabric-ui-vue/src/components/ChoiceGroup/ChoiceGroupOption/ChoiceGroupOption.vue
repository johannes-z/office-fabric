<template>
  <div :class="classNames.root">
    <div :class="classNames.wrapper">
      <input :id="`ChoiceGroup${_uid}-${id}`"
             :name="`ChoiceGroup${_uid}`"
             :class="classNames.input"
             :disabled="disabled"
             type="radio">

      <label :for="`ChoiceGroup${_uid}-${id}`" :class="classNames.field">
        <template v-if="imageSrc" />
        <template v-else-if="iconProps">
          <div :class="classNames.innerField">
            <div :class="classNames.iconWrapper">
              <Icon v-bind="iconProps" />
            </div>
          </div>
        </template>

        <div v-if="imageSrc || iconProps" :class="classNames.labelWrapper">
          <span class="ms-ChoiceFieldLabel"><slot>{{ text }}</slot></span>
        </div>
        <span v-else class="ms-ChoiceFieldLabel"><slot>{{ text }}</slot></span>
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { getStyles } from './ChoiceGroupOption.styles'
import { getClassNames } from '../../../util/getClassNames'

import { Icon } from '../../Icon'
import { Label } from '../../Label'

@Component({
  components: { Icon, Label },
})
export default class ChoiceGroupOption extends BaseComponent {
  @Prop() id!: string
  @Prop() text!: string
  @Prop() iconProps!: any
  @Prop() imageSrc!: any
  @Prop() checked!: boolean
  @Prop() disabled!: boolean
  @Prop({ default: () => ({ width: 32, height: 32 }) }) imageSize!: any
  @Prop() focused!: boolean

  get classNames () {
    const { theme, iconProps, imageSrc, checked, disabled, imageSize, focused } = this

    return getClassNames(getStyles, {
      theme: theme!,
      hasIcon: !!iconProps,
      hasImage: !!imageSrc,
      checked,
      disabled,
      imageIsLarge: !!imageSrc && (imageSize.width > 71 || imageSize.height > 71),
      imageSize,
      focused,
    })
  }
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div :area-label="areaLabel"
       :class="classNames.root"
       :style="{ '--size': `${size}px` }">
    <div :class="classNames.ratingFocusZone">
      <button v-for="ratingLevel in ratingLevels"
              :key="ratingLevel"
              :class="classNames.ratingButton"
              v-bind="$attrs"
              :disabled="disabled"
              @click="!disabled && !readonly && setRating(ratingLevel)">
        <span :class="classNames.labelText">{{ `Select ${ratingLevel} of ${max}` }}</span>
        <div :class="classNames.ratingStar">
          <Icon
            :icon-name="getRatingIconName(ratingLevel)"
            :class="classNames.ratingStarBack" />
          <Icon :icon-name="iconName"
                :class="classNames.ratingStarFront"
                :style="{ width: getRatingFillPercentage(ratingLevel) }" />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon/'
import { IconButton } from '../Button/'
import { IRatingProps, IRatingStyles } from './Rating.types'
import BaseComponent from '../BaseComponent'
import { getClassNames } from '../../util/getClassNames'

@Component({
  components: { Icon, IconButton },
  inheritAttrs: false,
})
export default class Rating extends BaseComponent<IRatingProps, IRatingStyles> {
  @Prop({ default: 16 }) size!: number
  @Prop({ default: 0 }) min!: number
  @Prop({ default: 10 }) max!: number
  @Prop({ default: 0 }) rating!: number
  @Prop({ default: '' }) ariaLabelFormat?: string
  @Prop({ default: 'FavoriteStarFill' }) iconName!: string
  @Prop({ default: 'FavoriteStar' }) unselectedIconName!: string
  @Prop({ default: false }) disabled?: boolean
  @Prop({ default: false }) readonly?: boolean

  internalValue: number = this.rating

  get classNames () {
    const { disabled, readonly, theme } = this
    return getClassNames(this.styles, {
      disabled,
      readonly,
      theme,
    })
  }

  get ratingLevels () {
    const { min, max } = this
    if (min < 0 || max <= min) return []

    var i = min + 1
    return Array(max - min).fill(undefined).map(() => i++)
  }

  get areaLabel () {
    if (!this.ariaLabelFormat) return ''

    return this.ariaLabelFormat.replace('{0}', `${this.internalValue}`).replace('{1}', `${this.max}`)
  }

  getRatingIconName (ratingLevel:number) {
    return this.internalValue >= ratingLevel ? this.iconName : this.unselectedIconName
  }

  getRatingFillPercentage (ratingLevel:number) {
    if (ratingLevel - this.internalValue <= 0) return '100%'
    if (ratingLevel - this.internalValue > 1) return '0%'
    if (ratingLevel - this.internalValue > 0) return `${(1 - (ratingLevel - this.internalValue)) * 100}%`
  }

  setRating (rating:number) {
    this.internalValue = rating
  }

  @Watch('rating')
  private onPropValueChanged (newValue: number) {
    this.internalValue = newValue
  }

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }
}
</script>

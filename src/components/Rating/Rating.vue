<template>
  <div :area-label="areaLabel"
       v-bind="css.root">
    <div v-bind="css.ratingFocusZone">
      <button v-for="ratingLevel in ratingLevels"
              :key="ratingLevel"
              v-bind="[css.ratingButton, $attrs]"
              :disabled="disabled"
              @click="!disabled && !readonly && setRating(ratingLevel)">
        <span v-bind="css.labelText">{{ `Select ${ratingLevel} of ${max}` }}</span>
        <div v-bind="css.ratingStar">
          <Icon
            :icon-name="getRatingIconName(ratingLevel)"
            v-bind="css.ratingStarBack" />
          <Icon :icon-name="iconName"
                v-bind="css.ratingStarFront"
                :style="{ width: getRatingFillPercentage(ratingLevel) }" />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Icon from '../Icon/Icon.vue'
import IconButton from '../Button/IconButton.vue'
import { IRatingProps, IRatingStyles } from './Rating.types'
import BaseComponent from '../BaseComponent'

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

  get baseStyles (): IRatingStyles {
    const { $style, disabled, readonly, size } = this
    return {
      root: [
        'ms-Rating-star',
        'ms-Rating-star-root',
        $style.root,
        disabled && $style.disabled,
        {
          '--size': `${size}px`,
        },
      ],
      ratingFocusZone: [
        'ms-FocusZone',
        'ms-Rating-focuszone',
        $style.ratingFocusZone,
      ],
      labelText: [
        'ms-Rating-labelText',
        $style.labelText,
      ],
      ratingButton: [
        'ms-RatingButton',
        $style.ratingButton,
        disabled && $style.disabled,
        readonly && $style.readonly,
      ],
      ratingStar: [
        'ms-RatingStar-container',
        $style.ratingStar,
      ],
      ratingStarBack: [
        'ms-RatingStar-back',
        $style.ratingStarBack,
        disabled && $style.disabled,
      ],
      ratingStarFront: [
        'ms-RatingStar-front',
        $style.ratingStarFront,
        disabled && $style.disabled,
      ],
    }
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

  internalValue: number = this.rating

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

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
}
.rootSmall {
  height: 36px;
}
.rootLarge {
  height: 36px;
}
.ratingFocusZone {
  position: relative;
  display: inline-block;
  outline: transparent;
}
.ratingButton {
    position: relative;
    background-color: transparent;
    padding-top: 8px;
    padding-right: 2px;
    padding-bottom: 8px;
    padding-left: 2px;
    box-sizing: content-box;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    cursor: pointer;
    outline: transparent;
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    font-size: var(--size);
    line-height: var(--size);
    height: var(--size);
    &.readonly {
      cursor: default;
    }
    &.disabled {
      cursor: default;
    }
}
.labelText {
    position: absolute;
    width: 1px;
    height: 1px;
    margin-top: -1px;
    margin-right: -1px;
    margin-bottom: -1px;
    margin-left: -1px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    overflow: hidden;
}
.ratingStar {
    display: inline-block;
    position: relative;
    height: inherit;
}
.ratingStarBack {
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    speak: none;
    font-family: FabricMDL2Icons;
    color: rgb(96, 94, 92);
    width: 100%;
    &.disabled {
      color: rgb(200, 198, 196);
    }
}
.ratingStarFront {
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    speak: none;
    font-family: FabricMDL2Icons;
    position: absolute;
    left: 0px;
    top: 0px;
    text-align: center;
    vertical-align: middle;
    color: rgb(50, 49, 48);
    overflow: hidden;
    &.disabled {
      color: rgb(200, 198, 196);
    }
}
</style>

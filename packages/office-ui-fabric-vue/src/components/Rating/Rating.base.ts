import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon'
import { IconButton } from '../Button'
import { IRatingProps, IRatingStyles, IRatingStyleProps, RatingSize } from './Rating.types'
import BaseComponent from '../BaseComponent'
import { classNamesFunction, css, format } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IRatingStyleProps, IRatingStyles>()

@Component({
  components: { Icon, IconButton },
  inheritAttrs: false,
})
export class RatingBase extends BaseComponent<IRatingProps> {
  @Prop({ type: Number, default: RatingSize.Small }) size!: number
  @Prop({ type: Number, default: 0 }) min!: number
  @Prop({ type: Number, default: 10 }) max!: number
  @Prop({ type: Number, default: 0 }) rating!: number
  @Prop({ type: String, default: '' }) ariaLabelFormat?: string
  @Prop({ type: String, default: 'FavoriteStarFill' }) iconName!: string
  @Prop({ type: String, default: 'FavoriteStar' }) unselectedIconName!: string
  @Prop({ type: Boolean, default: false }) disabled?: boolean
  @Prop({ type: Boolean, default: false }) readonly?: boolean

  internalValue: number = this.rating

  get classNames () {
    const { disabled, readonly, theme } = this
    return getClassNames(this.styles, {
      disabled,
      readOnly: readonly,
      theme,
    })
  }

  get ratingLevels () {
    const { min, max } = this
    if (min < 0 || max <= min) return []

    let i = min + 1
    return Array(max - min).fill(undefined).map(() => i++)
  }

  get ariaLabel () {
    if (!this.ariaLabelFormat) return ''

    return this.ariaLabelFormat.replace('{0}', `${this.internalValue}`).replace('{1}', `${this.max}`)
  }

  getRatingIconName (ratingLevel:number) {
    return this.internalValue >= ratingLevel ? this.iconName : this.unselectedIconName
  }

  getRatingFillPercentage (ratingLevel: number): number {
    if (ratingLevel - this.internalValue <= 0) return 100
    if (ratingLevel - this.internalValue > 1) return 0
    if (ratingLevel - this.internalValue > 0) return (1 - (ratingLevel - this.internalValue)) * 100
    return 0
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

  private getStarId (id: string, starNum: number) {
    return `${id}-star-${starNum - 1}`
  }

  render (h: CreateElement) {
    const { internalValue: displayRating, ariaLabelFormat, classNames, readonly, ariaLabel, max, size, disabled, iconName, unselectedIconName } = this
    const id = 'Rating'
    const labelId = 'RatingLabel'

    const rootSizeClass = size === RatingSize.Large ? classNames.rootIsLarge : classNames.rootIsSmall

    const $stars = this.ratingLevels.map(starNum => {
      const fillPercentage = this.getRatingFillPercentage(starNum)
      return h('button', {
        key: starNum,
        attrs: {
          id: this.getStarId(id, starNum),
          ...(starNum === Math.ceil(displayRating) && { 'data-is-current': true }),
          disabled: !!(disabled || readonly),
          role: 'presentation',
          type: 'button',
        },
        class: css(
          classNames.ratingButton,
          size === RatingSize.Large ? classNames.ratingStarIsLarge : classNames.ratingStarIsSmall,
        ),
        on: {
          focus: ev => this.setRating(starNum),
          click: ev => this.setRating(starNum),
        },
      }, [
        h('span', {
          class: classNames.labelText,
          attrs: {
            id: `${labelId}-${starNum}`,
          },
        }, format(ariaLabelFormat || '', starNum, max)),
        h('div', { class: classNames.ratingStar }, [
          h(Icon, {
            class: classNames.ratingStarBack,
            props: {
              iconName: fillPercentage > 0 ? iconName : unselectedIconName,
            },
          }),
          !disabled && h(Icon, {
            class: classNames.ratingStarFront,
            props: {
              iconName: fillPercentage > 0 ? iconName : unselectedIconName,
            },
            style: { width: fillPercentage + '%' },
          }),
        ]),
      ])
    })

    return h('div', {
      ref: 'root',
      attrs: {
        ...this.$attrs,
        'aria-label': readonly ? ariaLabel : '',
      },
      class: css('ms-Rating-star', classNames.root, rootSizeClass),
    }, [
      h('div', {
        class: css(classNames.ratingFocusZone, rootSizeClass),
      }, $stars),
    ])
  }
}

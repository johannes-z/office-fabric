import { classNamesFunction, css } from '@fluentui-vue/utilities'
import { type PropType, type Ref, type VNode, computed, defineComponent, h, ref, toRefs } from 'vue'
import { useClamp } from '@vueuse/math'
import { Icon } from '../Icon/'
import { type IRatingStarProps, type IRatingStyleProps, type IRatingStyles, RatingSize } from './Rating.types'
import { asSlotProps, makeStylingProps, warnMutuallyExclusive } from '@/utils'
import { useProxiedModel } from '@/composables'

const getClassNames = classNamesFunction<IRatingStyleProps, IRatingStyles>()

const COMPONENT_NAME = 'Rating'

function RatingStar(props: IRatingStarProps) {
  const slotProps = asSlotProps({
    ratingStar: {
      class: props.classNames.ratingStar,
    },
    ratingStarBack: {
      class: props.classNames.ratingStarBack,
      iconName: props.fillPercentage === 0 || props.fillPercentage === 100 ? props.icon : props.unselectedIcon,
    },
    ratingStarFront: {
      class: props.classNames.ratingStarFront,
      iconName: props.icon,
      style: {
        width: `${props.fillPercentage}%`,
      },
    },
  })
  return h('div', slotProps.ratingStar, [
    h(Icon, slotProps.ratingStarBack),
    !props.disabled && h(Icon, slotProps.ratingStarFront),
  ])
}
RatingStar.props = ['classNames', 'fillPercentage', 'disabled', 'icon', 'starNum', 'unselectedIcon']

function getFillingPercentage(starNum: number, displayRating: number): number {
  const ceilValue = Math.ceil(displayRating)
  let fillPercentage = 100

  if (starNum === displayRating)
    fillPercentage = 100
  else if (starNum === ceilValue)
    fillPercentage = 100 * (displayRating % 1)
  else if (starNum > ceilValue)
    fillPercentage = 0

  return fillPercentage
}

export const RatingBase = defineComponent({
  name: COMPONENT_NAME,

  emits: [
    'change',
    'update:modelValue',
  ],

  props: {
    ...makeStylingProps(),

    modelValue: { type: Number, default: undefined },
    defaultRating: { type: Number, default: undefined },
    rating: { type: Number, default: undefined },

    allowZeroStars: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    size: { type: Number as PropType<RatingSize>, default: RatingSize.Small },
    max: { type: Number, default: 5 },
    icon: { type: String, default: 'FavoriteStarFill' },
    unselectedIcon: { type: String, default: 'FavoriteStar' },

    onChange: { type: Function as PropType<(event?: Event, newValue?: number) => void>, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const {
      theme,
      styles,
      className,
      allowZeroStars,
      disabled,
      readOnly,
      max,
      size,
      icon,
      unselectedIcon,
    } = toRefs(props)

    warnMutuallyExclusive(COMPONENT_NAME, props, {
      modelValue: 'rating',
    })

    const modelValue: Ref<number> = useProxiedModel(props, 'modelValue', props.rating ?? props.defaultRating ?? 0)

    const classNames = computed(() => getClassNames(styles.value, {
      disabled: disabled.value,
      readOnly: readOnly.value,
      theme: theme.value,
    }))

    const slotProps = computed(() => asSlotProps({
      root: {
        class: classNames.value.root,
        // 'aria-label': readOnly.value ? props.ariaLabel : undefined,
        role: !readOnly.value ? 'radiogroup' : undefined,
      },
      ratingButton: {
        class: css(
          classNames.value.ratingButton,
          size.value === RatingSize.Large ? classNames.value.ratingStarIsLarge : classNames.value.ratingStarIsSmall,
        ),
        disabled: !!(disabled.value || readOnly.value),
        role: 'radio',
        'aria-hidden': readOnly.value ? 'true' : undefined,
        type: 'button',
      },
    }))

    const min = computed(() => Math.max(allowZeroStars.value ? 0 : 1, 0))
    const displayRating = useClamp(modelValue, min, max)

    return () => {
      const stars: VNode[] = []
      for (let starNum = 1; starNum <= max.value; starNum++) {
        const fillPercentage = getFillingPercentage(starNum, displayRating.value)

        const starProps = {
          fillPercentage,
          disabled: disabled.value,
          icon: fillPercentage > 0 ? icon.value : unselectedIcon.value,
          unselectedIcon: unselectedIcon.value,
          starNum,
          classNames: classNames.value,
        }

        stars.push(
          h('button', {
            ...slotProps.value.ratingButton,
            'aria-checked': starNum === Math.ceil(displayRating.value),
            onClick: (ev: PointerEvent) => {
              modelValue.value = starNum
              props.onChange?.(ev, starNum)
            },
          }, [
            slots.star?.(starProps) || h(RatingStar, starProps),
          ]),
        )
      }

      return h('div', slotProps.value.root, stars)
    }
  },
})

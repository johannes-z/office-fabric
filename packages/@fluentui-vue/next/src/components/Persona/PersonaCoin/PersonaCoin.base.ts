import { classNamesFunction, getRTL, memoizeFunction } from '@fluentui-vue/utilities'
import { mergeStyles } from '@fluentui/merge-styles'
import { computed, defineComponent, h, toRefs } from 'vue'
import { Icon } from '../../Icon'
import { Image, ImageFit } from '../../Image'
import type {
  IPersonaCoinStyleProps,
  IPersonaCoinStyles, PersonaInitialsColor,
} from '../Persona.types'
import { PersonaPresence as PersonaPresenceEnum, PersonaSize } from '../Persona.types'
import { sizeToPixels } from '../PersonaConsts'
import { getPersonaInitialsColor } from '../PersonaInitialsColor'
import { PersonaPresence } from '../PersonaPresence'
import { asSlotProps, getInitials, useStylingProps } from '@/utils'

const getClassNames = classNamesFunction<IPersonaCoinStyleProps, IPersonaCoinStyles>({
  // There can be many PersonaCoin rendered with different sizes.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

const getInitialsStyles = memoizeFunction(
  (
    className: string,
    initialsColor: PersonaInitialsColor | string | undefined,
    initialsTextColor: string | undefined,
    text: string | undefined,
    primaryText: string | undefined,
    showUnknownPersonaCoin: boolean | undefined,
  ) =>
    mergeStyles(
      className,
      !showUnknownPersonaCoin && {
        backgroundColor: getPersonaInitialsColor({ text, initialsColor, primaryText }),
        color: initialsTextColor,
      },
    ),
)

export const PersonaCoinBase = defineComponent({
  props: {
    ...useStylingProps(),

    allowPhoneInitials: { type: Boolean, default: false },
    presence: { type: Number as () => PersonaPresenceEnum, default: PersonaPresenceEnum.none },
    size: { type: Number, default: null },
    coinSize: { type: Number, default: null },
    coinProps: { type: Object, default: undefined },
    showUnknownPersonaCoin: { type: Boolean, default: false },
    isOutOfOffice: {},
    presenceTitle: {},
    imageUrl: {},
    imageInitials: {},
    text: { type: String, default: undefined },
    primaryText: { type: String, default: undefined },
    initialsColor: { type: String, default: undefined },
    initialsTextColor: { type: String, default: undefined },
  },

  setup(props, { attrs, slots }) {
    const {
      theme,
      styles,
      className,
      coinProps,
      imageInitials,
      allowPhoneInitials,
      showUnknownPersonaCoin,
      text,
      coinSize,
      size,
      isOutOfOffice,
      presence,
      presenceTitle,
      imageUrl,
      initialsColor,
      initialsTextColor,
      primaryText,
    } = toRefs(props)

    const initials = computed(() => {
      const isRTL = getRTL(theme.value)

      return imageInitials.value || getInitials(text.value, isRTL, allowPhoneInitials.value)
    })

    const dimension = computed(() => coinSize.value || sizeToPixels[size.value])

    const personaPresenceProps = computed(() => ({
      coinSize: coinSize.value,
      isOutOfOffice: isOutOfOffice.value,
      presence: presence.value,
      presenceTitle: presenceTitle.value,
      size: size.value,
      theme: theme.value,
    }))

    const shouldRenderInitials = computed(() => !imageUrl.value)
    const coinSizeStyle = computed(() => coinSize.value ? { width: coinSize.value, height: coinSize.value } : undefined)

    const classNames = computed(() => {
      return getClassNames(styles.value, {
        theme: theme.value,
        className: (coinProps.value && coinProps.value.className) ? coinProps.value.className : className.value,
        size: size.value,
        coinSize: coinSize.value,
        showUnknownPersonaCoin: showUnknownPersonaCoin.value,
      })
    })

    const slotProps = computed(() => asSlotProps({
      coin: {
        class: classNames.value.coin,
        role: 'presentation',
      },
      imageArea: {
        class: classNames.value.imageArea,
        style: coinSizeStyle.value,
        role: 'presentation',
      },
      image: {
        class: classNames.value.image,
        imageFit: ImageFit.cover,
        src: imageUrl.value,
        width: dimension.value,
        height: dimension.value,
      },
      initials: {
        class: getInitialsStyles(
          classNames.value.initials,
          initialsColor.value,
          initialsTextColor.value,
          text.value,
          primaryText.value,
          showUnknownPersonaCoin.value,
        ),
        style: coinSizeStyle.value,
        ariaHidden: 'true',
      },

    }))

    return () => h('div', slotProps.value.coin, [
      (size.value !== PersonaSize.size8)
        ? h('div', slotProps.value.imageArea, [
          shouldRenderInitials.value && h('div', slotProps.value.initials, [
            initials.value
              ? h('span', initials.value)
              : h(Icon, { props: { iconName: 'Contact' } }),
          ]),
          imageUrl.value && h(Image, slotProps.value.image),
          h(PersonaPresence, personaPresenceProps.value),
        ])
        : presence.value
          ? h(PersonaPresence, personaPresenceProps.value)
          : h(Icon, { class: classNames.value.size10WithoutPresenceIcon, iconName: 'Contact' }),
    ])
  },
})

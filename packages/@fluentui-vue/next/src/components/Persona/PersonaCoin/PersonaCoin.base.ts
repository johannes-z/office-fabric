import { classNamesFunction, getRTL, memoizeFunction } from '@fluentui-vue/utilities'
import { mergeStyles } from '@fluentui/merge-styles'
import type { CreateElement, VNode } from 'vue'
import Vue from 'vue'
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
import { getInitials, useStylingProps } from '@/utils'

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

export const PersonaCoinBase = Vue.extend({
  props: {
    ...useStylingProps(),

    allowPhoneInitials: { type: Boolean, default: false },
    presence: { type: Number as () => PersonaPresenceEnum, default: PersonaPresenceEnum.none },
    size: { type: Number, default: null },
    coinSize: { type: Number, default: null },
    coinProps: {},
    showUnknownPersonaCoin: {},
    isOutOfOffice: {},
    presenceTitle: {},
    imageUrl: {},
    imageInitials: {},
    text: {},
    initialsColor: {},
  },

  data() {
    return {
      mergeStyles,
      getPersonaInitialsColor,
      PersonaSize,
      ImageFit,
    }
  },

  computed: {
    initials() {
      const { imageInitials, allowPhoneInitials, showUnknownPersonaCoin } = this
      const isRTL = getRTL(this.theme)

      return imageInitials || getInitials(this.text, isRTL, allowPhoneInitials)
    },

    dimension() {
      const { coinSize, size } = this
      return coinSize || sizeToPixels[size]
    },

    personaPresenceProps() {
      const { coinSize, theme, isOutOfOffice, presence, presenceTitle, size } = this
      return {
        coinSize,
        isOutOfOffice,
        presence,
        presenceTitle,
        size,
        theme,
      }
    },

    shouldRenderInitials() {
      return !this.imageUrl
    },

    coinSizeStyle() {
      const { coinSize } = this
      return coinSize ? { width: coinSize, height: coinSize } : undefined
    },

    classNames() {
      const { styles, theme, className, coinProps, size, coinSize, showUnknownPersonaCoin } = this
      return getClassNames(styles, {
        theme: theme!,
        className: coinProps && coinProps.className ? coinProps.className : className,
        size,
        coinSize,
        showUnknownPersonaCoin,
      })
    },
  },

  render(h: CreateElement): VNode {
    const { classNames, size, initials, presence, personaPresenceProps, coinSizeStyle, shouldRenderInitials, showUnknownPersonaCoin, imageUrl, dimension } = this

    return h('div', {
      class: classNames.coin,
      attrs: { role: 'presentation' },
    }, [
      (size !== PersonaSize.size8)
        ? h('div', {
          class: classNames.imageArea,
          style: this.coinSizeStyle,
          attrs: { role: 'presentation' },
        }, [
          shouldRenderInitials && h('div', {
            class: mergeStyles(
              classNames.initials,
              !showUnknownPersonaCoin && { backgroundColor: getPersonaInitialsColor(this.$props as any) },
            ),
            style: coinSizeStyle,
            attrs: { ariaHidden: 'true' },
          }, [
            initials
              ? h('span', initials)
              : h(Icon, { props: { iconName: 'Contact' } }),
          ]),
          imageUrl && h(Image, {
            class: classNames.image,
            attrs: {
              imageFit: ImageFit.cover,
              src: imageUrl,
              width: dimension,
              height: dimension,
            },
          }),
          h(PersonaPresence, { props: personaPresenceProps }),
        ])
        : presence
          ? h(PersonaPresence, { props: personaPresenceProps })
          : h(Icon, { class: classNames.size10WithoutPresenceIcon, props: { iconName: 'Contact' } }),
    ])
  },
})

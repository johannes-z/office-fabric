import { defineComponent, h } from 'vue'

import { classNamesFunction } from '@fluentui-vue/utilities'
import { Icon } from '../../Icon'
import type { IPersonaPresenceStyleProps, IPersonaPresenceStyles, PersonaSize } from '../Persona.types'
import { PersonaPresence as PersonaPresenceEnum } from '../Persona.types'
import { sizeBoolean } from '../PersonaConsts'
import { makeStylingProps } from '@/utils'

const coinSizeFontScaleFactor = 6
const coinSizePresenceScaleFactor = 3
const presenceMaxSize = 40
const presenceFontMaxSize = 20

const getClassNames = classNamesFunction<IPersonaPresenceStyleProps, IPersonaPresenceStyles>({
  // There can be many PersonaPresence rendered with different sizes.
  // Therefore setting a larger cache size.
  cacheSize: 100,
})

export const PersonaPresenceBase = defineComponent({
  props: {
    ...makeStylingProps(),

    presence: { type: Number as () => PersonaPresenceEnum, required: true },
    size: { type: Number, default: undefined },
    coinSize: { type: Number, default: undefined },
    isOutOfOffice: { type: Boolean, default: false },
    presenceTitle: { type: String, default: undefined },
  },

  data() {
    return {
      PersonaPresenceEnum,
    }
  },

  computed: {
    renderIcon() {
      const { coinSize } = this
      const size = sizeBoolean(this.size as PersonaSize)
      return !(size.isSize8 || size.isSize10 || size.isSize16 || size.isSize24 || size.isSize28 || size.isSize32)
        && (coinSize ? coinSize > 32 : true)
    },

    presenceHeightWidth() {
      const { coinSize } = this
      return coinSize
        ? coinSize / coinSizePresenceScaleFactor < presenceMaxSize
          ? `${coinSize / coinSizePresenceScaleFactor}px`
          : `${presenceMaxSize}px`
        : ''
    },

    coinSizeWithPresenceStyle() {
      const { coinSize, presenceHeightWidth } = this
      return coinSize
        ? { width: presenceHeightWidth, height: presenceHeightWidth }
        : undefined
    },

    coinSizeWithPresenceIconStyle(): any {
      const { coinSize, presenceHeightWidth } = this

      const presenceFontSize: string = coinSize
        ? coinSize / coinSizeFontScaleFactor < presenceFontMaxSize
          ? `${coinSize / coinSizeFontScaleFactor}px`
          : `${presenceFontMaxSize}px`
        : ''

      return coinSize
        ? { fontSize: presenceFontSize, lineHeight: presenceHeightWidth }
        : undefined
    },

    classNames() {
      const { styles, theme, presence, size, isOutOfOffice } = this
      return getClassNames(styles, {
        theme,
        presence,
        size,
        isOutOfOffice,
      })
    },

    icon() {
      const { presence, isOutOfOffice } = this
      return determineIcon(presence, isOutOfOffice)
    },
  },

  render() {
    const { classNames, presence, presenceTitle, coinSizeWithPresenceStyle, coinSizeWithPresenceIconStyle, icon, renderIcon } = this
    if (presence === PersonaPresenceEnum.none)
      return

    return h('div', {
      class: classNames.presence,
      title: presenceTitle,
      style: coinSizeWithPresenceStyle,
    }, [
      renderIcon && h(Icon, {
        class: classNames.presenceIcon,
        style: coinSizeWithPresenceIconStyle,
        iconName: icon,
      }),
    ])
  },
})

function determineIcon(
  presence: PersonaPresenceEnum | undefined,
  isOutOfOffice: boolean | undefined,
): string | undefined {
  if (!presence)
    return undefined

  const oofIcon = 'SkypeArrow'

  switch (PersonaPresenceEnum[presence]) {
    case 'online':
      return 'SkypeCheck'
    case 'away':
      return isOutOfOffice ? oofIcon : 'SkypeClock'
    case 'dnd':
      return 'SkypeMinus'
    case 'offline':
      return isOutOfOffice ? oofIcon : ''
  }

  return ''
}
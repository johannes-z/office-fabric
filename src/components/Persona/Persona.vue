<template>
  <div v-bind="css.root">
    <div v-bind="css.coin">
      <Icon v-if="coinSize < 24 && !status"
            v-bind="css.withoutPresenceIcon"
            icon-name="Contact" />
      <div v-else-if="coinSize < 24 && status" v-bind="css.presenceCoin" />
      <div v-else v-bind="css.imageArea">
        <div v-if="imageUrl" v-bind="css.imageContainer">
          <img
            v-bind="css.image"
            :src="imageUrl"
            alt="">
        </div>
        <div v-else v-bind="css.personaInitials">
          <span>{{ imageInitials }}</span>
        </div>
        <div v-bind="css.presence">
          <Icon v-if="renderIcon"
                :icon-name="presenceIcon"
                v-bind="css.presenceIcon" />
        </div>
      </div>
    </div>
    <div v-bind="css.details">
      <div dir="auto" v-bind="css.primaryText">
        <div v-bind="css.tooltipHostRoot">{{ primaryText }}</div>
      </div>
      <div dir="auto" v-bind="css.secondaryText">
        <div v-bind="css.tooltipHostRoot">{{ secondaryText }}</div>
      </div>
      <div dir="auto" v-bind="css.tertiaryText">
        <div v-bind="css.tooltipHostRoot">{{ tertiaryText }}</div>
      </div>
      <div dir="auto" v-bind="css.optionalText">
        <div v-bind="css.tooltipHostRoot">{{ optionalText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Icon from '../Icon/Icon.vue'
import BaseComponent from '../BaseComponent'
import { IPersonaProps, IPersonaStyles } from '../Persona'
import { PersonaInitialsColor } from './Persona.types'

const presenceColorAvailable = '#6BB700'
const presenceColorAway = '#FFAA44'
const presenceColorBusy = '#C43148'
const presenceColorDnd = '#C50F1F'
const presenceColorOffline = '#8A8886'
const presenceColorOof = '#B4009E'

const COLOR_SWATCHES_LOOKUP: PersonaInitialsColor[] = [
  PersonaInitialsColor.lightBlue,
  PersonaInitialsColor.blue,
  PersonaInitialsColor.darkBlue,
  PersonaInitialsColor.teal,
  PersonaInitialsColor.green,
  PersonaInitialsColor.darkGreen,
  PersonaInitialsColor.lightPink,
  PersonaInitialsColor.pink,
  PersonaInitialsColor.magenta,
  PersonaInitialsColor.purple,
  PersonaInitialsColor.orange,
  PersonaInitialsColor.lightRed,
  PersonaInitialsColor.darkRed,
  PersonaInitialsColor.violet,
  PersonaInitialsColor.gold,
  PersonaInitialsColor.burgundy,
  PersonaInitialsColor.warmGray,
  PersonaInitialsColor.cyan,
  PersonaInitialsColor.rust,
  PersonaInitialsColor.coolGray,
]

const COLOR_SWATCHES_NUM_ENTRIES = COLOR_SWATCHES_LOOKUP.length

@Component({
  name: 'OPersona',
  components: { Icon },
})
export default class Persona extends BaseComponent<IPersonaProps, IPersonaStyles> {
  @Prop({ default: 48 }) size!: number
  @Prop({ default: undefined }) imageUrl?: string
  @Prop({ default: undefined }) primaryText?: string
  @Prop({ default: undefined }) imageInitials?: string
  @Prop({ default: undefined }) initialsColor?: string
  @Prop({ default: undefined }) status?: string // online, away, busy
  @Prop({ default: undefined }) secondaryText?: string
  @Prop({ default: undefined }) tertiaryText?: string
  @Prop({ default: undefined }) optionalText?: string
  @Prop({ default: undefined }) presence?: string
  @Prop({ default: false }) isOutOfOffice?: boolean
  @Prop({ default: false }) hidePersonaDetails?: boolean
  @Prop({ default: false }) showSecondaryText?: boolean
  @Prop({ default: false }) showTertiaryText?: boolean
  @Prop({ default: false }) showOptionalText?: boolean

  get coinSize () {
    if (this.size < 24) return 8
    if (this.size < 32) return 24
    if (this.size < 40) return 32
    if (this.size < 48) return 40
    if (this.size < 56) return 48
    if (this.size < 72) return 56
    if (this.size < 100) return 72
    if (this.size < 120) return 100
    return 120
  }

  get coinInitialsFont () {
    if (this.size < 24) return 10
    if (this.size < 32) return 14
    if (this.size < 40) return 16
    if (this.size < 48) return 16
    if (this.size < 56) return 20
    if (this.size < 72) return 28
    if (this.size < 100) return 42
    if (this.size < 120) return 42
    return 42
  }
  get presenceIcon () {
    const oofIcon = 'SkypeArrow'
    const { status, isOutOfOffice } = this
    switch (status) {
      case 'online':
        return 'SkypeCheck'
      case 'away':
        return isOutOfOffice ? oofIcon : 'SkypeClock'
      case 'dnd':
        return 'SkypeMinus'
      case 'offline':
        return isOutOfOffice ? oofIcon : ''
    }
  }

  get detailsFontSizePrimary () {
    if (this.coinSize < 24) return 12
    if (this.coinSize < 56) return 14
    return 20
  }

  get detailsFontSize () {
    if (this.coinSize < 24) return 10
    if (this.coinSize < 56) return 12
    return 14
  }

  get detailsPaddingStyle () {
    if (this.coinSize < 24) return { 'padding-right': '24px', 'padding-left': '17px' }
    if (this.coinSize < 40) return { 'padding-right': '8px', 'padding-left': '8px' }
    if (this.coinSize < 56) return { 'padding-right': '12px', 'padding-left': '12px' }
    return { 'padding-right': '16px', 'padding-left': '24px' }
  }

  get presenceIconFontSize () {
    if (this.coinSize < 40) return undefined
    if (this.coinSize < 56) return 6
    if (this.coinSize < 72) return 8
    if (this.coinSize < 100) return 12
    return 14
  }

  get renderIcon () {
    return (this.coinSize ? this.coinSize > 32 : true)
  }

  get presenceSize () {
    if (this.size < 40) return 10
    if (this.size < 56) return 12
    if (this.size < 72) return 16
    if (this.size < 100) return 20
    if (this.size < 120) return 28
    return 32
  }

  get presenceColor () {
    const { status } = this

    if (this.isOutOfOffice) return presenceColorOof

    const statusMap = {
      'none': presenceColorOffline,
      'offline': presenceColorOffline,
      'online': presenceColorAvailable,
      'away': presenceColorAway,
      'dnd': presenceColorDnd,
      'blocked': presenceColorBusy,
      'busy': presenceColorBusy,
    }

    // @ts-ignore
    if (status && status in statusMap) return statusMap[status]

    return presenceColorOffline
  }

  get borderSize () {
    return this.coinSize >= 72 ? '2px' : '1px'
  }

  get personaInitialsColor () {
    const { primaryText, initialsColor } = this
    var initialsColorCode = ''
    if (typeof initialsColor === 'string') {
      initialsColorCode = initialsColor
    } else {
      let initialsColorGenerated = initialsColor !== undefined ? initialsColor : this.getInitialsColorFromName(primaryText)
      initialsColorCode = this.personaInitialsColorToHexCode(initialsColorGenerated)
    }

    return initialsColorCode
  }

  personaInitialsColorToHexCode (personaInitialsColor: PersonaInitialsColor) {
    switch (personaInitialsColor) {
      case PersonaInitialsColor.lightBlue:
        return '#4F6BED'
      case PersonaInitialsColor.blue:
        return '#0078D4'
      case PersonaInitialsColor.darkBlue:
        return '#004E8C'
      case PersonaInitialsColor.teal:
        return '#038387'
      case PersonaInitialsColor.lightGreen:
      case PersonaInitialsColor.green:
        return '#498205'
      case PersonaInitialsColor.darkGreen:
        return '#0B6A0B'
      case PersonaInitialsColor.lightPink:
        return '#C239B3'
      case PersonaInitialsColor.pink:
        return '#E3008C'
      case PersonaInitialsColor.magenta:
        return '#881798'
      case PersonaInitialsColor.purple:
        return '#5C2E91'
      case PersonaInitialsColor.orange:
        return '#CA5010'
      case PersonaInitialsColor.red:
        return '#EE1111'
      case PersonaInitialsColor.lightRed:
        return '#D13438'
      case PersonaInitialsColor.darkRed:
        return '#A4262C'
      case PersonaInitialsColor.transparent:
        return 'transparent'
      case PersonaInitialsColor.violet:
        return '#8764B8'
      case PersonaInitialsColor.gold:
        return '#986F0B'
      case PersonaInitialsColor.burgundy:
        return '#750B1C'
      case PersonaInitialsColor.warmGray:
        return '#7A7574'
      case PersonaInitialsColor.cyan:
        return '#005B70'
      case PersonaInitialsColor.rust:
        return '#8E562E'
      case PersonaInitialsColor.coolGray:
        return '#69797E'
      case PersonaInitialsColor.black:
        return '#1D1D1D'
      case PersonaInitialsColor.gray:
        return '#393939'
    }
    return ''
  }

  getInitialsColorFromName (displayName: string | undefined): PersonaInitialsColor {
    let color = PersonaInitialsColor.blue
    if (!displayName) {
      return color
    }

    let hashCode = 0
    for (let iLen: number = displayName.length - 1; iLen >= 0; iLen--) {
      const ch: number = displayName.charCodeAt(iLen)
      const shift: number = iLen % 8
      // tslint:disable-next-line:no-bitwise
      hashCode ^= (ch << shift) + (ch >> (8 - shift))
    }

    color = COLOR_SWATCHES_LOOKUP[hashCode % COLOR_SWATCHES_NUM_ENTRIES]

    return color
  }

  get baseStyles (): IPersonaStyles {
    const { $style, size, status } = this
    return {
      root: [
        'ms-Persona',
        $style.root,
        {
          '--coinSize': `${this.coinSize}px`,
          '--detailsFontSizePrimary': `${this.detailsFontSizePrimary}px`,
          '--detailsFontSize': `${this.detailsFontSize}px`,
          '--presenceSize': `${this.presenceSize}px`,
          '--presenceColor': this.presenceColor,
          '--presenceIconFontSize': `${this.presenceIconFontSize}px`,
        },
        this.coinSize < 24 ? {
          'height': '20px',
          'min-width': '20px',
        } : {
          'height': `${this.coinSize}px`,
          'min-width': `${this.coinSize}px`,
        },
      ],
      coin: [
        'ms-Persona-coin',
        $style.coin,
      ],
      imageArea: [
        'ms-Persona-imageArea',
        $style.imageArea,
      ],
      imageContainer: [
        'ms-Image',
        'ms-Persona-image',
        $style.imageContainer,
      ],
      image: [
        'ms-Image-image',
        'ms-Image-image--cover',
        'ms-Image-image--portrait',
        $style.image,
        this.coinSize < 24 && {
          display: 'none',
        },
      ],
      presence: [
        'ms-Persona-presence',
        !status && {
          display: 'none',
        },
        /*    '::after': this.coinSize >= 40 && status === 'blocked' && {
        content: "";
        width: 100%;
        height: 2px;
        background-color: rgb(196, 49, 72);
        transform: translateY(-50%) rotate(-45deg);
        position: absolute;
        top: 50%;
        left: 0px;
      }
  } */
        {
          'border-width': `${this.borderSize}px`,
        },
        $style.presence,
      ],
      presenceIcon: ['ms-Persona-presenceIcon', $style.presenceIcon],
      presenceCoin: ['ms-Persona-presence', $style.presenseCoin],
      details: [
        'ms-Persona-details',
        $style.details,
        this.detailsPaddingStyle,
      ],
      tooltipHostRoot: ['ms-TooltipHost', $style.tooltipHostRoot],
      primaryText: [
        'ms-Persona-primaryText',
        $style.primaryText,
        this.hidePersonaDetails && this.coinSize >= 24 && {
          display: 'none',
        },
      ],
      secondaryText: [
        'ms-Persona-secondaryText',
        $style.secondaryText,
        ((this.coinSize < 40 && !this.showSecondaryText) || this.hidePersonaDetails) && {
          display: 'none',
        },
      ],
      tertiaryText: [
        'ms-Persona-tertiaryText',
        $style.tertiaryText,
        ((this.coinSize < 72 && !this.showTertiaryText) || this.hidePersonaDetails) && {
          display: 'none',
        },
      ],
      optionalText: [
        'ms-Persona-optionalText',
        $style.optionalText,
        ((this.coinSize < 100 && !this.showOptionalText) || this.hidePersonaDetails) && {
          display: 'none',
        },
      ],
      withoutPresenceIcon: [
        $style.withoutPresenceIcon,
      ],
      personaInitials: [
        'ms-Persona-initials',
        $style.personaInitials,
        {
          'font-size': `${this.coinInitialsFont}px`,
          'background-color': this.personaInitialsColor,
        },
      ],
    }
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
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    box-sizing: border-box;
    color: rgb(50, 49, 48);
    position: relative;
    display: flex;
    align-items: center;
}
.coin {
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
}
.imageArea {
    position: relative;
    text-align: center;
    height: var(--coinSize);
    width: var(--coinSize);
    flex: 0 0 auto;
}
.imageContainer {
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    animation-name: css-0;
    animation-duration: 0.367s;
    animation-timing-function: cubic-bezier(0.1, 0.25, 0.75, 0.9);
    animation-fill-mode: both;
    position: absolute;
    margin-right: 10px;
    top: 0px;
    left: 0px;
    width: var(--coinSize);
    height: var(--coinSize);
    perspective: 1px;
    overflow: hidden;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    border-radius: 50%;
}
.image {
    display: block;
    opacity: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.presence {
    position: absolute;
    height: var(--presenceSize);
    width: var(--presenceSize);
    top: auto;
    right: -2px;
    bottom: -2px;
    text-align: center;
    box-sizing: content-box;
    background-clip: content-box;
    background-color: var(--presenceColor);
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    border-color: rgb(255, 255, 255);
    border-image: initial;
}
.presenseCoin {
  position: absolute;
  height: var(--coinSize);
  width: var(--coinSize);;
  top: 7px;
  right: auto;
  bottom: -2px;
  text-align: center;
  box-sizing: content-box;
  background-clip: content-box;
  left: 0px;
  background-color: var(--presenceColor);
  border-radius: 50%;
  border-width: 0px;
  border-style: initial;
  border-color: initial;
  border-image: initial;
}
.presenceIcon {
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    font-size: var(--presenceIconFontSize);
    speak: none;
    font-family: FabricMDL2Icons;
    color: rgb(255, 255, 255);
    line-height: var(--presenceSize);
    vertical-align: top;
}
.details {
    padding-top: 0px;
    padding-bottom: 0px;
    min-width: 0px;
    width: 100%;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.primaryText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(50, 49, 48);
    font-weight: 400;
    font-size: var(--detailsFontSizePrimary);
    overflow: hidden;
}
.secondaryText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: var(--detailsFontSize);
    overflow: hidden;
}
.tertiaryText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: var(--detailsFontSize);
    overflow: hidden;
}
.optionalText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: var(--detailsFontSize);
    overflow: hidden;
}
.tooltipHostRoot {
    display: inline;
}
.withoutPresenceIcon {
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    speak: none;
    font-family: FabricMDL2Icons;
    font-size: 10px;
    position: absolute;
    top: 5px;
    right: auto;
    left: 0px;
}
.personaInitials {
  color: rgb(255, 255, 255);
  font-weight: 600;
  line-height: var(--coinSize);
  height: var(--coinSize);
  border-radius: 50%;
}
</style>

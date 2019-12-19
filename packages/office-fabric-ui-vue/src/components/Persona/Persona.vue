<template>
  <div :class="classNames.root"
       :style="{
         '--size': `${size}px`,
         '--fontSizePrimary': `${fontSizePrimary}px`,
         '--fontSizeDetails': `${fontSizeDetails}px`,
         '--presenceSize': `${presenceSize}px`,
         '--presenceColor': presenceColor,
         '--presenceIconFontSize': `${fontSizeIcon}px`,
       }">
    <div :class="classNames.coin">
      <div :class="classNames.imageArea">
        <div :class="classNames.imageContainer">
          <img :class="classNames.image"
               :src="imageUrl"
               alt="">
        </div>
        <div :class="classNames.presence">
          <Icon :icon-name="presenceIcon" :class="classNames.presenceIcon" />
        </div>
      </div>
    </div>
    <div :class="classNames.details">
      <div dir="auto" :class="classNames.primaryText">
        <div :class="classNames.tooltipHostRoot">{{ primaryText }}</div>
      </div>
      <div dir="auto" :class="classNames.secondaryText">
        <div :class="classNames.tooltipHostRoot">{{ secondaryText }}</div>
      </div>
      <div dir="auto" :class="classNames.tertiaryText">
        <div :class="classNames.tooltipHostRoot">{{ tertiaryText }}</div>
      </div>
      <div dir="auto" :class="classNames.optionalText">
        <div :class="classNames.tooltipHostRoot">{{ optionalText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon/'
import BaseComponent from '../BaseComponent'
import { IPersonaProps, IPersonaStyles } from '../Persona'
import { getStyles } from './Persona.styles'
import { getClassNames } from '../../util/getClassNames'

@Component({
  name: 'OPersona',
  components: { Icon },
})
export default class Persona extends BaseComponent<IPersonaProps, IPersonaStyles> {
  @Prop({ type: Number, default: 48 }) size!: number
  @Prop({ type: String, default: undefined }) imageUrl?: string
  @Prop({ type: String, default: undefined }) primaryText?: string
  @Prop({ type: String, default: 'online' }) status?: string // online, away, busy
  @Prop({ type: String, default: undefined }) secondaryText?: string
  @Prop({ type: String, default: undefined }) tertiaryText?: string
  @Prop({ type: String, default: undefined }) optionalText?: string
  @Prop({ type: String, default: undefined }) presence?: string
  @Prop({ type: Boolean, default: false }) isOutOfOffice?: boolean
  @Prop({ type: Boolean, default: false }) hidePersonaDetails?: boolean
  @Prop({ type: Boolean, default: false }) showSecondaryText?: boolean

  get statusClass () {
    return 'ms-Persona--away'
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
  get fontSizePrimary () {
    if (this.size < 24) return 12
    if (this.size < 56) return 14
    return 20
  }
  get fontSizeDetails () {
    if (this.size < 24) return 10
    if (this.size < 56) return 12
    return 14
  }

  get fontSizeIcon () {
    if (this.size < 48) return 6
    if (this.size < 72) return 8
    if (this.size < 100) return 12
    return 14
  }

  get presenceSize () {
    if (this.size <= 12) return this.size
    if (this.size < 40) return 8
    if (this.size < 56) return 14
    if (this.size < 72) return 18
    if (this.size < 100) return 22
    if (this.size < 120) return 26
    return 34
  }

  get presenceColor () {
    const { status } = this

    const presenceColorAvailable = '#6BB700'
    const presenceColorAway = '#FFAA44'
    const presenceColorBusy = '#C43148'
    const presenceColorDnd = '#C50F1F'
    const presenceColorOffline = '#8A8886'
    const presenceColorOof = '#B4009E'

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

  get classNames () {
    const { theme, className, showSecondaryText, presence, size } = this
    return getClassNames(getStyles, {
      theme: theme!,
      className,
      showSecondaryText,
      presence,
      size,
    })
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
    height: 56px;
    min-width: 56px;
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
    height: var(--size);
    width: var(--size);
    flex: 0 0 auto;
}
.imageContainer {
    font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
    animation-name: css-0;
    animation-duration: 0.367s;
    animation-timing-function: cubic-bezier(0.1, 0.25, 0.75, 0.9);
    animation-fill-mode: both;
    position: absolute;
    margin-right: 10px;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 40px;
    perspective: 1px;
    overflow: hidden;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    border-radius: 50%;
    width: var(--size);
    height: var(--size);
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
.presenceIcon {
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    font-size: var(--fontSizeIcon);
    speak: none;
    font-family: FabricMDL2Icons;
    color: rgb(255, 255, 255);
    font-size: 12px;
    line-height: 20px;
    vertical-align: top;
}
.details {
    padding-top: 0px;
    padding-right: 24px;
    padding-bottom: 0px;
    padding-left: 16px;
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
    font-size: var(--fontSizePrimary);
    overflow: hidden;
}
.secondaryText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: var(--fontSizeDetails);
    overflow: hidden;
}
.tertiaryText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: var(--fontSizeDetails);
    display: none;
    overflow: hidden;
}
.optionalText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: var(--fontSizeDetails);
    display: none;
    overflow: hidden;
}
.tooltipHostRoot {
    display: inline;
}
</style>

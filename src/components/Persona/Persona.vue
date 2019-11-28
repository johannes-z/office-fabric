<template>
  <div :class="['ms-Persona',
                statusClass,
                $style.root,
                disabled && $style.disabled ]"
       :style="`--size: ${size}px`">
    <div :class="['ms-Persona-coin',
                  $style.coin]" />

    <div :class="['ms-Persona-imageArea',
                  $style.imageArea]">
      <div :class="['ms-Image',
                    'ms-Persona-image',
                    $style.imageContainer]">
        <img :class="['ms-Image-image',
                      'ms-Image-image--cover',
                      'ms-Image-image--portrait',
                      $style.image]"
             :src="imageUrl"
             alt="">
      </div>
      <div :class="['ms-Persona-presence', $style.presence]">
        <Icon :icon-name="presenceIcon" :class="['ms-Persona-presenceIcon', $style.presenceIcon]" />
      </div>
    </div>
    <div :class="['ms-Persona-details', $style.details]">
      <div dir="auto" :class="['ms-Persona-primaryText', $style.primaryText]">
        <div :class="['ms-TooltipHost', $style.tooltipHostRoot]">{{ primaryText }}</div>
      </div>
      <div dir="auto" :class="['ms-Persona-secondaryText', $style.secondaryText]">
        <div :class="['ms-TooltipHost', $style.tooltipHostRoot]">{{ secondaryText }}</div>
      </div>
      <div dir="auto" :class="['ms-Persona-tertiaryText', $style.tertiaryText]">
        <div :class="['ms-TooltipHost', $style.tooltipHostRoot]">{{ tertiaryText }}</div>
      </div>
      <div dir="auto" :class="['ms-Persona-optionalText', $style.optionalText]">
        <div :class="['ms-TooltipHost', $style.tooltipHostRoot]">{{ optionalText }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Icon from '../Icon/Icon.vue'

@Component({
  name: 'OPersona',
  components: { Icon },
})
export default class Persona extends Vue {
  @Prop({ default: 48 }) size!: number
  @Prop({ default: undefined }) imageUrl?: string
  @Prop({ default: undefined }) primaryText?: string
  @Prop({ default: undefined }) secondaryText?: string
  @Prop({ default: undefined }) tertiaryText?: string
  @Prop({ default: undefined }) optionalText?: string
  @Prop({ default: undefined }) presence?: string
  @Prop({ default: false }) isOutOfOffice?: boolean
  @Prop({ default: false }) hidePersonaDetails?: boolean

  get statusClass () {
    return 'ms-Persona--away'
  }
  get presenceIcon () {
    return 'SypeClock'
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
    margin-top: 0px;
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
    height: --size;
    min-width: --size;
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
    height: --size;;
    width: --size;;
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
    width: --size;
    height: --size;
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
    height: 12px;
    width: 12px;
    top: auto;
    right: -2px;
    bottom: -2px;
    text-align: center;
    box-sizing: content-box;
    background-clip: content-box;
    background-color: rgb(255, 170, 68);
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
    speak: none;
    font-family: FabricMDL2Icons;
    color: rgb(255, 255, 255);
    font-size: 6px;
    line-height: 12px;
    vertical-align: top;
    position: relative;
    left: 1px;
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
    font-size: 20px;
    overflow: hidden;
}
.secondaryText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: 14px;
    overflow: hidden;
}
.tertiaryText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: 14px;
    display: none;
    overflow: hidden;
}
.optionalText {
    text-overflow: ellipsis;
    white-space: nowrap;
    color: rgb(96, 94, 92);
    font-weight: 400;
    font-size: 14px;
    display: none;
    overflow: hidden;
}
.tooltipHostRoot {
    display: inline;
}
</style>

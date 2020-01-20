<template>
  <Layer>
    <div :class="classNames.root">
      <Overlay v-if="isBlocking && isOpen" :class="classNames.overlay" />
      <div :class="classNames.main">
        <div :class="classNames.commands">
          <div :class="classNames.navigation">
            <IconButton :class="classNames.closeButton"
                        :styles="{
                          root: {
                            height: 'auto',
                            width: '44px',
                            color: theme.palette.neutralSecondary,
                            fontSize: IconFontSizes.large
                          },
                          rootHovered: {
                            color: theme.palette.neutralPrimary
                          }
                        }"
                        :icon-props="{ iconName: 'Cancel' }"
                        @click.native="$emit('close')" />
          </div>
        </div>

        <div :class="classNames.contentInner">
          <div :class="classNames.header">
            <p :class="classNames.headerText">
              {{ headerText }}
            </p>
          </div>

          <div :class="classNames.scrollableContent">
            <div :class="classNames.content">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IPanelProps, IPanelStyles } from './Panel.types'
import BaseComponent from '../BaseComponent'
import { Layer, Overlay, IconButton } from '@/components/'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IconFontSizes } from '@uifabric/styling'

const getClassNames = classNamesFunction()

@Component({
  components: { Layer, Overlay, IconButton },
})
export default class Panel extends BaseComponent {
  @Prop({ type: String, default: null }) headerText!: string
  @Prop() focusTrapZoneProps!: any
  @Prop() headerClassName!: any
  @Prop() type!: any

  @Prop({ type: Boolean, default: false }) hasCloseButton!: boolean
  @Prop({ type: Boolean, default: false }) isAnimating!: boolean
  @Prop({ type: Boolean, default: false }) isFooterSticky!: boolean
  @Prop({ type: Boolean, default: false }) isFooterAtBottom!: boolean
  @Prop({ type: Boolean, default: false }) isOnRightSide!: boolean
  @Prop({ type: Boolean, default: false }) isOpen!: boolean
  @Prop({ type: Boolean, default: false }) isHiddenOnDismiss!: boolean
  @Prop({ type: Boolean, default: false }) isBlocking!: boolean

  IconFontSizes = IconFontSizes

  get classNames () {
    const {
      styles,
      theme,
      className = '',
      focusTrapZoneProps,
      hasCloseButton,
      headerClassName = '',
      isAnimating,
      isFooterSticky,
      isFooterAtBottom,
      isOnRightSide,
      isOpen,
      isHiddenOnDismiss,
      type,
    } = this

    return getClassNames(styles!, {
      theme: theme!,
      className,
      focusTrapZoneClassName: focusTrapZoneProps ? focusTrapZoneProps.className : undefined,
      hasCloseButton,
      headerClassName,
      isAnimating,
      isFooterSticky,
      isFooterAtBottom,
      isOnRightSide,
      isOpen,
      isHiddenOnDismiss,
      type,
    })
  }
}
</script>

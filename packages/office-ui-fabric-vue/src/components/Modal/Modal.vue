<template>
  <Layer>
    <Popup>
      <div :class="classNames.root">
        <Overlay />
        <div :class="classNames.main">
          <slot />
        </div>
      </div>
    </Popup>
  </Layer>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IModalProps, IModalStyles } from './Modal.types'
import BaseComponent from '../BaseComponent'
import { Layer } from '../Layer'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { getStyles } from './Modal.styles'
import { Popup } from '../Popup'
import { Overlay } from '../Overlay'

const getClassNames = classNamesFunction<any, any>()

@Component({
  components: { Layer, Popup, Overlay },
})
export default class Modal extends BaseComponent<IModalProps, IModalStyles> {
  @Prop({ type: Object, default: null }) layerProps!: any
  @Prop({ type: String, default: null }) containerClassName!: string
  @Prop({ type: String, default: null }) scrollableContentClassName!: string
  @Prop({ default: true }) isVisible!: boolean
  @Prop({ type: Object, default: null }) hasBeenOpened!: any
  @Prop({ type: Object, default: null }) modalRectangleTop!: any
  @Prop({ type: Object, default: null }) topOffsetFixed!: any
  @Prop({ type: Object, default: null }) isModeless!: any
  @Prop({ type: Object, default: null }) dragOptions!: any

  get classNames () {
    const {
      theme,
      className,
      layerProps,
      containerClassName,
      scrollableContentClassName,
      isVisible,
      hasBeenOpened,
      modalRectangleTop,
      topOffsetFixed,
      isModeless,
      dragOptions,
    } = this

    const layerClassName = layerProps == null ? '' : layerProps.className

    return getClassNames(getStyles, {
      theme,
      className,
      containerClassName,
      scrollableContentClassName,
      isOpen: true,
      isVisible,
      hasBeenOpened,
      modalRectangleTop,
      topOffsetFixed,
      isModeless,
      layerClassName,
      isDefaultDragHandle: dragOptions && !dragOptions.dragHandleSelector,
    })
  }
}
</script>

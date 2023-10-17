import type { VNode } from 'vue'
import { computed, defineComponent, getCurrentInstance, h, onBeforeUnmount, onMounted, reactive, ref, toRefs, watchEffect } from 'vue'
import { css, getId } from '@fluentui-vue/utilities'
import { notifyHostChanged, registerLayerHost, unregisterLayerHost } from './Layer.notification'
import type { ILayerHost } from './LayerHost.types'
import { makeStylingProps } from '@/utils'

export const LayerHost = defineComponent({
  name: 'LayerHost',

  props: {
    id: { type: String, default: getId() },
  },

  setup(props, { attrs, slots }) {
    const { id: hostId } = toRefs(props)

    const rootRef = ref<HTMLDivElement | null>(null)
    const layerHostRef = computed(() => ({
      hostId: hostId.value,
      rootRef: reactive(rootRef),
      notifyLayersChanged: () => {},
    }))

    onMounted(() => {
      watchEffect(() => {
        registerLayerHost(hostId.value, layerHostRef.value)
        notifyHostChanged(hostId.value)
      })
    })

    onBeforeUnmount(() => {
      unregisterLayerHost(hostId.value, layerHostRef.value)
      notifyHostChanged(hostId.value)
    })

    return () => h('div', {
      ...props,
      class: css('ms-LayerHost', attrs.class!),
      ref: layerHostRef.value.rootRef,
      id: hostId,
    }, slots)
  },
})

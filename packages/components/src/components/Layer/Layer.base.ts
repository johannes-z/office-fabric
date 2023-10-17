import type { Ref } from 'vue'
import { Teleport, computed, defineComponent, getCurrentInstance, h, onBeforeMount, onBeforeUnmount, onMounted, ref, toRefs, watch, watchEffect } from 'vue'
import { classNamesFunction, getDocument } from '@fluentui-vue/utilities'
import { createDefaultLayerHost, getDefaultTarget, getLayerHost, registerLayer, unregisterLayer } from './Layer.notification'
import type { ILayerStyleProps, ILayerStyles } from './Layer.types'
import { makeStylingProps } from '@/utils'
import { useForwardRef } from '@/composables'

const getClassNames = classNamesFunction<ILayerStyleProps, ILayerStyles>()

export const LayerBase = defineComponent({
  name: 'LayerBase',

  props: {
    ...makeStylingProps(),
    hostId: { type: String, default: null },
    insertFirst: { type: Boolean, default: false },
    onLayerDidMount: { type: Function, default: undefined },
    onLayerDidUnmount: { type: Function, default: undefined },
    onLayerWillUnmount: { type: Function, default: undefined },
  },

  setup(props, { slots, expose }) {
    const {
      styles, theme, className, hostId, insertFirst,
    } = toRefs(props)

    const rootRef = ref<HTMLSpanElement | null>(null)
    const layerRef = ref<any>(null)
    const needRaiseLayerMount = ref(false)

    const classNames = computed(() => {
      return getClassNames(styles.value, {
        theme: theme.value!,
        className: className.value,
        isNotHost: !hostId.value,
      })
    })

    const slotProps = computed(() => ({
      content: {
        class: classNames.value.content,
      },
      portal: {
        to: layerRef.value,
      },
    }))

    const getHost = (doc: Document) => {
      if (hostId.value) {
        const layerHost = getLayerHost(hostId.value)

        if (layerHost)
          return layerHost.rootRef.value ?? null

        return doc.getElementById(hostId.value) ?? null
      }
      else {
        const defaultHostSelector = getDefaultTarget()

        // Find the host.
        let host: Node | null = defaultHostSelector ? (doc.querySelector(defaultHostSelector) as Node) : null

        // If no host is available, create a container for injecting layers in.
        // Having a container scopes layout computation.
        if (!host)
          host = createDefaultLayerHost(doc)

        return host
      }
    }

    // Removes the current layer element's parentNode and runs onLayerWillUnmount prop if provided.
    const removeLayerElement = (): void => {
      props.onLayerWillUnmount?.()

      const elem = layerRef.value

      // Clear ref before removing from the DOM
      layerRef.value = undefined

      if (elem && elem.parentNode)
        elem.parentNode.removeChild(elem)
    }

    const createLayerElement = () => {
      const doc = getDocument(rootRef.value)

      if (!doc)
        return

      const host = getHost(doc)

      if (!host)
        return

      // Remove and re-create any previous existing layer elements.
      removeLayerElement()

      const el = (host.ownerDocument ?? doc).createElement('div')
      el.className = classNames.value.root!

      insertFirst.value ? host.insertBefore(el, host.firstChild) : host.appendChild(el)
      layerRef.value = el
      needRaiseLayerMount.value = true
    }

    watchEffect(() => {
      createLayerElement()
      if (hostId.value)
        registerLayer(hostId.value, createLayerElement)

      props.onLayerDidMount?.()
      needRaiseLayerMount.value = false
    })

    onBeforeUnmount(() => {
      if (hostId.value)
        unregisterLayer(hostId.value, createLayerElement)

      removeLayerElement()
    })

    watchEffect(() => {
      if (!(layerRef.value || !needRaiseLayerMount.value))
        return
      props.onLayerDidMount?.()
      needRaiseLayerMount.value = false
    })

    return () => {
      return h('span', { ref: rootRef, class: 'ms-layer' }, [
        layerRef.value && h(Teleport, slotProps.value.portal, [
          h('div', slotProps.value.content, slots),
        ]),
      ])
    }
  },
})

import { type VNodeRef, cloneVNode, computed, defineComponent, h, onBeforeUnmount, onMounted, ref, toRefs, watch } from 'vue'
import { classNamesFunction, on } from '@fluentui-vue/utilities'
import { makeStylingProps, styleToObject } from '..'
import type { ICoordinates, IDragData, IDraggableZoneProps, IDraggableZoneStyles } from '.'
import { useSlotHelpers } from '@/composables'

const getClassNames = classNamesFunction<IDraggableZoneProps, IDraggableZoneStyles>()

// These are needed so that we can generalize the events
// and so we have access to clientX and clientY in the touch events
type MouseTouchEvent = MouseEvent & TouchEvent & Event

export const DraggableZone = defineComponent({
  name: 'DraggableZone',

  props: {
    ...makeStylingProps(),

    position: { type: Object as () => ICoordinates, default: () => ({ x: 0, y: 0 }) },
    handleSelector: { type: String, default: null },
    preventDragSelector: { type: String, default: null },
    onStart: { type: Function, default: null },
    onStop: { type: Function, default: null },
    onDragChange: { type: Function, default: null },
  },

  setup(props, { attrs, slots, emit }) {
    const eventMapping = {
      touch: {
        start: 'touchstart',
        move: 'touchmove',
        stop: 'touchend',
      },
      mouse: {
        start: 'mousedown',
        move: 'mousemove',
        stop: 'mouseup',
      },
    }

    const { styles, handleSelector, preventDragSelector, onStart, onStop, onDragChange } = toRefs(props)
    const classNames = computed(() => getClassNames(styles.value))
    const style = computed(() => styleToObject(attrs.style as any))

    const root = ref<VNodeRef | null>(null)
    const isDragging = ref(false)
    const position = ref<ICoordinates>(props.position || { x: 0, y: 0 })
    const lastPosition = ref<ICoordinates | null>(null)
    const touchId = ref<number | null | undefined>(null)
    const currentEventType = ref<{ start: string; move: string; stop: string }>(eventMapping.mouse)
    const events = ref<(() => void)[]>([])

    watch(() => props.position, (newValue, oldValue) => {
      if (newValue && (!oldValue || newValue !== oldValue))
        position.value = newValue
    })

    onBeforeUnmount(() => {
      events.value.forEach(dispose => dispose())
    })

    const {
      renderSlot,
    } = useSlotHelpers(slots, 'default')

    const getChildrenEvent = (eventName: string) => {
      if (!root.value)
        return null
      if (!root.value.$el)
        return null

      return root.value.$el[eventName]
    }

    const onMouseDown = (event: MouseTouchEvent) => {
      const onMouseDown = getChildrenEvent('onMouseDown')
      if (onMouseDown)
        onMouseDown(event)

      currentEventType.value = eventMapping.mouse
      return onDragStart(event)
    }

    const onMouseUp = (event: MouseTouchEvent) => {
      const onMouseUp = getChildrenEvent('onMouseUp')
      if (onMouseUp)
        onMouseUp(event)

      currentEventType.value = eventMapping.mouse
      return onDragStop(event)
    }

    const onTouchStart = (event: MouseTouchEvent) => {
      const onTouchStart = getChildrenEvent('onTouchStart')
      if (onTouchStart)
        onTouchStart(event)

      currentEventType.value = eventMapping.touch
      return onDragStart(event)
    }

    const onTouchEnd = (event: MouseTouchEvent) => {
      const onTouchEnd = getChildrenEvent('onTouchEnd')
      if (onTouchEnd)
        onTouchEnd(event)

      currentEventType.value = eventMapping.touch
      onDragStop(event)
    }

    const onDragStart = (event: MouseTouchEvent) => {
      // Only handle left click for dragging
      if (typeof event.button === 'number' && event.button !== 0)
        return false

      // If the target doesn't match the handleSelector OR
      // if the target does match the preventDragSelector, bail out
      if (
        (handleSelector.value && !matchesSelector(event.target as HTMLElement, handleSelector.value))
          || (preventDragSelector.value
            && matchesSelector(event.target as HTMLElement, preventDragSelector.value))
      )
        return

      // Remember the touch identifier if this is a touch event so we can
      // distinguish between individual touches in multitouch scenarios
      // by remembering which touch point we were given
      touchId.value = getTouchId(event)

      const pos = getControlPosition(event)
      if (pos === undefined)
        return

      const dragData = createDragDataFromPosition(pos)

      emit('start', event, dragData)
      onStart.value && onStart.value(event, dragData)

      isDragging.value = true
      lastPosition.value = pos

      // hook up the appropriate mouse/touch events to the body to ensure
      // smooth dragging
      events.value = [
        on(document.body, currentEventType.value.move, ev => onDrag(ev as MouseTouchEvent), true /* use capture phase */),
        on(document.body, currentEventType.value.stop, ev => onDragStop(ev as MouseTouchEvent), true /* use capture phase */),
      ]
    }

    const onDrag = (event: MouseTouchEvent) => {
      if (!isDragging.value)
        return

      event.preventDefault()

      // Prevent scrolling on mobile devices
      if (event.type === 'touchmove')
        event.preventDefault()

      const pos = getControlPosition(event)
      if (!pos)
        return

      // create the updated drag data from the position data
      const updatedData = createUpdatedDragData(createDragDataFromPosition(pos))
      const updatedPosition = updatedData.position

      emit('dragChange', event, updatedData)
      onDragChange.value && onDragChange.value(event, updatedData)

      position.value = updatedPosition
      lastPosition.value = pos
    }

    const onDragStop = (event: MouseTouchEvent) => {
      if (!isDragging.value)
        return

      event.preventDefault()

      const pos = getControlPosition(event)
      if (!pos)
        return

      const baseDragData = createDragDataFromPosition(pos)

      // Set dragging to false and reset the lastPosition
      isDragging.value = false
      lastPosition.value = null

      emit('stop', event, baseDragData)
      onStop.value && onStop.value(event, baseDragData)

      if (props.position)
        position.value = props.position

      // Remove event handlers
      events.value.forEach(dispose => dispose())
    }

    /**
     * Get the control position based off the event that fired
     * @param event - The event to get offsets from
     */
    const getControlPosition = (event: MouseTouchEvent) => {
      const touchObj = getActiveTouch(event)

      // did we get the right touch?
      if (touchId.value !== undefined && !touchObj)
        return undefined

      const eventToGetOffset = touchObj || event
      return {
        x: eventToGetOffset.clientX,
        y: eventToGetOffset.clientY,
      }
    }

    /**
     * Get the active touch point that we have saved from the event's TouchList
     * @param event - The event used to get the TouchList for the active touch point
     */
    const getActiveTouch = (event: MouseTouchEvent) => {
      return (
        (event.targetTouches && findTouchInTouchList(event.targetTouches))
            || (event.changedTouches && findTouchInTouchList(event.changedTouches))
      )
    }

    const getTouchId = (event: MouseTouchEvent) => {
      const touch: Touch | undefined
          = (event.targetTouches && event.targetTouches[0]) || (event.changedTouches && event.changedTouches[0])

      if (touch)
        return touch.identifier
    }

    const matchesSelector = (element: HTMLElement | null, selector: string) => {
      if (!element || element === document.body)
        return false

      const matchesSelectorFn: Function
            // eslint-disable-next-line deprecation/deprecation
            = element.matches || element.webkitMatchesSelector || (element as any).msMatchesSelector /* for IE */

      if (!matchesSelectorFn)
        return false

      return matchesSelectorFn.call(element, selector) || matchesSelector(element.parentElement, selector)
    }

    /**
     * Attempts to find the Touch that matches the identifier  we stored in dragStart
     * @param touchList The TouchList to look for the stored identifier from dragStart
     */
    const findTouchInTouchList = (touchList: TouchList) => {
      if (touchId.value === undefined)
        return

      for (let i = 0; i < touchList.length; i++) {
        if (touchList[i].identifier === touchId.value)
          return touchList[i]
      }

      return undefined
    }

    /**
     * Create DragData based off of the last known position and the new position passed in
     * @param position The new position as part of the drag
     */
    const createDragDataFromPosition = (position: ICoordinates) => {
      // If we have no lastPosition, use the given position
      // for last position
      if (lastPosition.value === null) {
        return {
          delta: { x: 0, y: 0 },
          lastPosition: position,
          position,
        }
      }

      return {
        delta: {
          x: position.x - lastPosition.value.x,
          y: position.y - lastPosition.value.y,
        },
        lastPosition: lastPosition.value,
        position,
      }
    }

    /**
     * Creates an updated DragData based off the current position and given baseDragData
     * @param baseDragData The base DragData (from _createDragDataFromPosition) used to calculate the updated positions
     */
    const createUpdatedDragData = (baseDragData: IDragData) => {
      return {
        position: {
          x: position.value.x + baseDragData.delta.x,
          y: position.value.y + baseDragData.delta.y,
        },
        delta: baseDragData.delta,
        lastPosition: position.value,
      }
    }

    return () => {
      const children = renderSlot() || []
      let x = position.value.x
      let y = position.value.y

      if (position.value && !isDragging.value) {
        x = props.position.x
        y = props.position.y
      }

      return h(children[0], {
        ref: root,

        style: {
          ...style,
          transform: `translate(${x}px, ${y}px)`,
        },

        class: classNames.value.root,
        onMouseDown,
        onMouseUp,
        onTouchStart,
        onTouchEnd,
      })
    }
  },
})

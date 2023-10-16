import { DirectionalHint, getFirstVisibleElementFromSelector, type Point } from "@fluentui-vue/utilities"
import { computed, defineComponent, toRefs, type PropType, h } from "vue"
import { Callout, type ICalloutProps, type Target } from "..";
import { ktpTargetFromSequences, mergeOverflows } from "@/utils/keytips/KeytipUtils";
import { getCalloutOffsetStyles, getCalloutStyles } from "./Keytip.styles";

export const Keytip = defineComponent({
    name: 'Keytip',
  
    props: {
        keySequences: { type: Array as PropType<string[]>, default: () => [] },
        offset: { type: Object as PropType<Point>, default: () => ({ x: 0, y: 0 }) },
        overflowSetSequence: { type: Array as PropType<string[]>, default: () => [] },
        calloutProps: { type: Object as PropType<ICalloutProps>, default: () => ({}) },
    },
  
    setup(props, { attrs, slots, emit, expose }) {
      const {
        keySequences, 
        offset, 
        overflowSetSequence,
        calloutProps,
      } = toRefs(props)
  
      const keytipTarget = computed(() => {
        let keytipTarget: Target;
        // Take into consideration the overflow sequence
        if (overflowSetSequence.value) {
            keytipTarget = ktpTargetFromSequences(mergeOverflows(keySequences.value, overflowSetSequence.value));
        } else {
            keytipTarget = ktpTargetFromSequences(keySequences.value);
        }
        return keytipTarget;
      });

  
      const element = computed(() => getFirstVisibleElementFromSelector(keytipTarget.value));
      const hasElement = computed(() => !!element.value);

      const calculatedCalloutProps = computed(() => {
        let calcProps = calloutProps.value;
        if (offset) {
            // Set callout to top-left corner, will be further positioned in
            // getCalloutOffsetStyles
            calcProps = {
              ...calloutProps.value,
              coverTarget: true,
              directionalHint: DirectionalHint.topLeftEdge,
            };
          }
      
          if (!calloutProps.value || calloutProps.value.directionalHint === undefined) {
            // Default callout directional hint to BottomCenter
            calcProps = {
              ...calloutProps.value,
              directionalHint: DirectionalHint.bottomCenter,
            };
          }
          return calcProps;
      })

      return () => {
        if(!hasElement.value) return null

        return h(Callout, {
            ...calculatedCalloutProps.value,
            isBeakVisible: false,
            doNotLayer: true,
            minPagePadding: 0,
            styles: offset.value ? getCalloutOffsetStyles(offset.value) : getCalloutStyles,
            preventDismissOnScroll: true,
            target: keytipTarget.value
        }, [
            
        ])
      }
    },
  })
  
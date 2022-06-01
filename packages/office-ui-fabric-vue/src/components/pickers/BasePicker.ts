import Vue, { CreateElement, VNode } from 'vue'

import { classNamesFunction, elementContains } from '@uifabric-vue/utilities'
import { IBasePickerStyleProps, IBasePickerStyles } from './BasePicker.types'
import { withThemeableProps } from '@/useThemeable'
import { IProcessedStyleSet } from '@uifabric/merge-styles'
import { Selection, SelectionZone, SelectionMode } from '@/utilities'

import { Autofill } from '../Autofill/index'
import { Callout } from '../Callout'
import { DirectionalHint } from '@/common/DirectionalHint'

const getClassNames = classNamesFunction<IBasePickerStyleProps, IBasePickerStyles>()

export const BasePicker = Vue.extend({
  props: {
    ...withThemeableProps(),
    disabled: { type: Boolean, default: false },
    selectionRole: { type: String, default: 'list' },
    selectionAriaLabel: { type: String, default: '' },
    inputProps: { type: Object, default: undefined },
    itemLimit: { type: Number, default: undefined },

    onResolveSuggestions: { type: Function, default: undefined },
  },

  data () {
    return {
      selection: undefined as any,
      items: [],

      suggestedDisplayValue: '',
      isMostRecentlyUsedVisible: false,
      moreSuggestionsAvailable: false,
      isFocused: false,
      isSearching: false,
      selectedIndices: [],
      selectionRemoved: undefined,

      suggestionsVisible: false,
      suggestionsLoading: false,
      isResultsFooterVisible: false,
    }
  },

  computed: {
    classNames (): IProcessedStyleSet<IBasePickerStyles> {
      const { isFocused, className, inputProps, disabled, theme, styles } = this
      return getClassNames(styles, {
        theme,
        className,
        isFocused,
        disabled,
        inputClassName: inputProps && inputProps.className,
      })
    },

    canAddItems (): boolean {
      return true
      // return this.itemLimit === undefined || this.items.length < this.itemLimit;
    },
  },

  created () {
    this.selection = new Selection({ onSelectionChanged: () => this.onSelectionChange() })
  },

  methods: {
    onSelectionChange (): void {
      console.log(this.selection.getSelectedIndices())
    },
    updateSuggestionsList (suggestions: any[] | PromiseLike<any[]>, updatedValue?: string) {
    },
    resolveSuggestions (updatedValue: string): void {
      // const suggestions: any[] | PromiseLike<any[]> | null = this.onResolveSuggestions(updatedValue, this.items)

      console.log(updatedValue)
      this.suggestionsVisible = true

      // if (suggestions !== null) {
      //   this.updateSuggestionsList(suggestions, updatedValue)
      // }
    },
    updateValue (updatedValue: string) {
      this.resolveSuggestions(updatedValue)
    },
    onInputChange (value): void {
      this.updateValue(value)

      this.moreSuggestionsAvailable = true
      this.isMostRecentlyUsedVisible = false
    },
    onKeyDown (ev: KeyboardEvent) {

    },
    onFocus () {
      console.log('onFocus')
      if (this.isFocused) return
      this.isFocused = true
    },
    onBlur (ev: FocusEvent) {
      console.log('onBlur')
      if (!this.isFocused) return

      let relatedTarget: EventTarget | null = ev.relatedTarget
      if (ev.relatedTarget == null) {
        // In IE11, due to lack of support, event.relatedTarget is always
        // null making every onBlur call to be "outside" of the ComboBox
        // even when it's not. Using document.activeElement is another way
        // for us to be able to get what the relatedTarget without relying
        // on the event
        relatedTarget = document.activeElement
      }
      if (relatedTarget && !elementContains((this.$refs.root as HTMLDivElement), relatedTarget as HTMLElement)) {
        this.isFocused = false
        this.$emit('blur', ev)
        console.log('blur')
      }
    },
  },

  render (h: CreateElement): VNode {
    const { classNames } = this

    return h('div', {
      ref: 'root',
      class: classNames.root,
      on: {
        keydown: this.onKeyDown,
        focus: this.onFocus,
        blur: this.onBlur,
      },
    }, [
      h('span', {

      }, this.selectionAriaLabel),

      h(SelectionZone, {
        props: {
          selection: this.selection,
          selectionMode: SelectionMode.multiple,
        },
      }, [
        h('div', {
          class: classNames.text,
        }, [
          this.items.length > 0 && h('span', {
            class: classNames.itemsWrapper,
          }, this.items.map((item, index) => {
            return this.$scopedSlots?.renderItems?.({ item, index })
          })),
          this.canAddItems && h(Autofill, {
            ref: 'input',
            class: classNames.input,
            props: {
              suggestedDisplayValue: 'asdf',
              disabled: this.disabled,
            },
            on: {
              input: this.onInputChange,
            },
          }),
        ]),
      ]),

      this.suggestionsVisible && h(Callout, {
        props: {
          isBeakVisible: false,
          gapSpace: 5,
          // @ts-ignore
          target: this.$refs.input ? this.$refs.input.$el : undefined,
          directionalHint: DirectionalHint.bottomLeftEdge,
        },
      }, [
        h('div', 'suggestions'),
      ]),
    ])
  },
})

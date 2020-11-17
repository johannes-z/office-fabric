import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { RectangleEdge, ICalloutPositionedInfo } from '../../utilities/positioning'

import { Icon } from '../Icon'
import { Label } from '../Label'
import { Callout, DirectionalHint } from '../Callout'
import { ActionButton } from '../Button'
import { Checkbox } from '../Checkbox'
import { classNamesFunction } from '@uifabric-vue/utilities'
import { IDropdownStyleProps, IDropdownStyles } from './Dropdown.types'
import { CreateElement } from 'vue'

const getClassNames = classNamesFunction<IDropdownStyleProps, IDropdownStyles>()

@Component({
  components: { Callout, ActionButton, Checkbox, Icon, Label },
})
export class DropdownBase extends BaseComponent {
  $refs!: {
    dropdown: HTMLDivElement
  }

  @Prop({ type: Array, required: true }) options!: any[]
  @Prop({ type: Array, default: () => [] }) selectedOptions!: any[]

  @Prop({ type: String, default: '' }) label!: string
  @Prop({ type: String, default: '' }) placeholder!: string
  @Prop({ type: String, default: '' }) errorMessage!: string
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: Boolean, default: false }) disabled!: boolean

  @Prop({ type: Boolean, default: false }) multiSelect!: boolean
  @Prop({ type: String, default: ', ' }) multiSelectDelimiter !: string

  @Prop({ type: Number, default: 0 }) dropdownWidth!: number
  @Prop({ type: Object, default: () => {} }) panelProps!: any
  @Prop({ type: Object, default: () => {} }) calloutProps!: any

  isOpen: boolean = false
  calloutRenderEdge: RectangleEdge | undefined = undefined

  created () {
    this.options.forEach(option => {
      this.$set(option, 'isItemSelected', false)
    })
  }

  get classNames (): any {
    const { theme, className, errorMessage, label, required, disabled, panelProps, calloutProps } = this
    const { isOpen, calloutRenderEdge } = this
    const selectedOptions = this.selectedOptions
    return getClassNames(this.styles, {
      theme,
      className,
      hasError: !!(errorMessage && errorMessage.length > 0),
      hasLabel: !!label,
      isOpen,
      required,
      disabled,
      isRenderingPlaceholder: !selectedOptions.length,
      panelClassName: panelProps?.className,
      calloutClassName: calloutProps?.className,
      calloutRenderEdge: calloutRenderEdge,
    })
  }

  get multiSelectItemStyles () {
    return this.classNames.subComponentStyles
      ? this.classNames.subComponentStyles.multiSelectItem
      : undefined
  }

  get hasErrorMessage () {
    return this.errorMessage && this.errorMessage.length > 0
  }

  private select (option: any) {
    if (option.disabled) return

    const index = this.selectedOptions.findIndex(o => o.key === option.key)

    if (index > -1) {
      this.selectedOptions[index].isItemSelected = false
      this.selectedOptions.splice(index, 1)
    } else {
      if (!this.multiSelect) {
        this.selectedOptions.splice(0, this.selectedOptions.length)
        this.isOpen = false
      }
      option.isItemSelected = true
      this.selectedOptions.push(option)
    }
  }

  private onPositioned (positions: ICalloutPositionedInfo) {
    if (!this.calloutRenderEdge || this.calloutRenderEdge !== positions.targetEdge) {
      this.calloutRenderEdge = positions.targetEdge
    }
  }

  private onDismiss () {
    this.isOpen = false
  }

  /**
   * Scroll handler for the callout to make sure the mouse events
   * for updating focus are not interacting during scroll
   */
  private onScroll (): void {
    // if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
    //   clearTimeout(this._scrollIdleTimeoutId);
    //   this._scrollIdleTimeoutId = undefined;
    // } else {
    //   this._isScrollIdle = false;
    // }

    // this._scrollIdleTimeoutId = window.setTimeout(() => {
    //   this._isScrollIdle = true;
    // }, this._scrollIdleDelay);
  };

  // private onRenderContainer (props: any) {
  //   const { calloutProps, panelProps } = props
  //   // const { responsiveMode, dropdownWidth } = this.props;
  //   const dropdownWidth = 0

  //   const isSmall = true // responsiveMode! <= ResponsiveMode.medium;

  //   const panelStyles = this.classNames.subComponentStyles
  //     ? this.classNames.subComponentStyles.panel
  //     : undefined

  //   return isSmall
  //     ? h('Panel', {
  //       attrs: {
  //         isOpen: true,
  //         isLightDismiss: true,
  //         hasCloseButton: false,
  //         styles: panelStyles,
  //         ...panelProps,
  //       },
  //       on: {
  //         dismiss: this.onDismiss,
  //       },
  //     }, [
  //       this.renderFocusableList(props),
  //     ])
  //     : h(Callout, {
  //       class: this.classNames.callout,
  //       attrs: {
  //         isBeakVisible: false,
  //         gapSpace: 0,
  //         doNotLayer: false,
  //         directionalHintFixed: false,
  //         directionalHint: DirectionalHint.bottomLeftEdge,
  //         ...calloutProps,
  //         target: this.$refs.dropdown,
  //         calloutWidth: dropdownWidth || (this.$refs.dropdown ? this.$refs.dropdown.clientWidth : 0),
  //       },
  //       on: {
  //         dismiss: this.onDismiss,
  //         scroll: this.onScroll,
  //         positioned: this.onPositioned,
  //       },
  //     }, [
  //       this.renderFocusableList(props),
  //     ])
  // }

  // private renderFocusableList (props: any) {
  //   const { onRenderList = this.onRenderList, label, ariaLabel, multiSelect } = props

  //   return h('div', {
  //     class: this.classNames.dropdownItemsWrapper,
  //     ref: 'host',
  //     attrs: {
  //       tabIndex: 0,
  //     },
  //     on: {
  //       // keydown: this.onZoneKeyDown,
  //       // keyup: this.onZoneKeyUp,
  //     },
  //   }, onRenderList(props, this.onRenderList))
  // }

  // private onRenderList (props: any) {
  //   // return
  // }

  render (h: CreateElement) {
    const { classNames, label, selectedOptions, multiSelect, multiSelectDelimiter, placeholder, isOpen, dropdownWidth, options, hasErrorMessage, errorMessage, required, disabled } = this

    const OptionComponent = multiSelect ? Checkbox : ActionButton

    const $label = h(Label, {
      class: classNames.label,
      attrs: {
        required,
        disabled,
      },
    }, label)
    const $dropdown = h('div', {
      ref: 'dropdown',
      class: classNames.dropdown,
      on: { click: () => (this.isOpen = true) },
    }, [
      h('span',
        { class: classNames.title },
        selectedOptions.length
          ? selectedOptions.map(i => i.text).join(multiSelectDelimiter)
          : placeholder,
      ),
      h('span', { class: classNames.caretDownWrapper }, [
        h(Icon, { class: classNames.caretDown, attrs: { iconName: 'ChevronDown' } }),
      ]),
    ])
    const $errorMessage = hasErrorMessage && h('div', {
      class: classNames.errorMessage,
      attrs: {
        role: 'alert',
      },
    }, errorMessage)

    const $callout = isOpen && h(Callout, {
      attrs: {
        target: this.$refs.dropdown,
        isBeakVisible: false,
        calloutWidth: dropdownWidth || (this.$refs.dropdown ? this.$refs.dropdown.clientWidth : 0),
      },
      on: {
        dismiss: this.onDismiss,
        positioned: this.onPositioned,
      },
    }, [
      h('div', { class: classNames.dropdownItemsWrapper, attrs: { tabindex: 0 } }, [
        options.map((option, index) => h(OptionComponent, {
          key: index,
          class: option.hidden
            ? classNames.dropdownItemHidden
            : option.isItemSelected && option.disabled === true
              ? classNames.dropdownItemSelectedAndDisabled
              : option.isItemSelected
                ? classNames.dropdownItemSelected
                : option.disabled === true
                  ? classNames.dropdownItemDisabled
                  : classNames.dropdownItem,
          style: multiSelect ? this.multiSelectItemStyles : null,
          attrs: {
            disabled: option.disabled,
            title: option.text,
            checked: option.isItemSelected,
            role: option,
          },
          nativeOn: {
            click: () => (!multiSelect && this.select(option)),
          },
          on: {
            input: () => (multiSelect && this.select(option)),
          },
        }, option.text)),
      ]),
    ])

    return h('div', { class: classNames.root }, [
      $label,
      $dropdown,
      $callout,
      $errorMessage,
    ])
  }
}

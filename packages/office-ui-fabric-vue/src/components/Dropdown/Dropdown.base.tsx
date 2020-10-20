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
import { h } from '@vue/composition-api'

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

    return (
      <div class={classNames.root}>
        <Label class={classNames.label}
          required={required}
          disabled={disabled}>
          { label }
        </Label>
        <div ref="dropdown"
          class={classNames.dropdown}
          onClick={() => (this.isOpen = true)}>
          <span class={classNames.title}>
            {selectedOptions.length
              ? selectedOptions.map(i => i.text).join(multiSelectDelimiter)
              : placeholder}
          </span>
          <span class={classNames.caretDownWrapper}>
            <Icon class={classNames.caretDown} icon-name="ChevronDown" />
          </span>
        </div>

        {isOpen && (
          <div>
            <Callout target={this.$refs.dropdown}
              is-beak-visible={false}
              callout-width={dropdownWidth || (this.$refs.dropdown ? this.$refs.dropdown.clientWidth : 0)}
              onDismiss={() => (this.isOpen = false)}
              onPositioned={this.onPositioned}>
              <div class={classNames.dropdownItemsWrapper}
                tabindex={0}>
                {options.map((option, index) => (
                  <OptionComponent
                    key={index}
                    class={
                      option.hidden
                        ? classNames.dropdownItemHidden
                        : option.isItemSelected && option.disabled === true
                          ? classNames.dropdownItemSelectedAndDisabled
                          : option.isItemSelected
                            ? classNames.dropdownItemSelected
                            : option.disabled === true
                              ? classNames.dropdownItemDisabled
                              : classNames.dropdownItem}
                    disabled={option.disabled}
                    title={option.text}
                    checked={option.isItemSelected}
                    styles={multiSelect ? this.multiSelectItemStyles : null}
                    role={option}
                    nativeOnClick={() => (!multiSelect && this.select(option))}
                    onInput={() => (multiSelect && this.select(option))}>
                    { option.text }
                  </OptionComponent>
                ))}
              </div>
            </Callout>
          </div>
        )}

        {hasErrorMessage && (
          <div role="alert" class={classNames.errorMessage}>
            { errorMessage }
          </div>
        )}
      </div>
    )
  }
}

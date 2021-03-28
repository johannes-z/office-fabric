import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Icon } from '../Icon'
import { Label } from '../Label'
import BaseComponent from '../BaseComponent'

import { IconButton } from '../Button/IconButton/IconButton'
import { Position } from '../../utils/positioning'
import {
  calculatePrecision,
  classNamesFunction,
  precisionRound,
} from '@uifabric-vue/utilities'

import { getStyles, getArrowButtonStyles } from './SpinButton.styles'
import { ISpinButtonProps, ISpinButtonStyleProps, ISpinButtonStyles } from './SpinButton.types'
import { CreateElement } from 'vue'

export enum KeyboardSpinDirection {
  down = -1,
  notSpinning = 0,
  up = 1,
}

export interface ISpinButtonState {
  /**
   * Is true when the control has focus.
   */
  isFocused: boolean;

  /**
   * the value of the spin button
   */
  value: string;

  /**
   * keyboard spin direction, used to style the up or down button
   * as active when up/down arrow is pressed
   */
  keyboardSpinDirection: KeyboardSpinDirection;
}

const getClassNames = classNamesFunction<ISpinButtonStyleProps, ISpinButtonStyles>()

@Component
export class SpinButtonBase extends BaseComponent<ISpinButtonProps> {
  @Prop({ type: Boolean, default: false }) disabled!: boolean
  @Prop({ type: Boolean, default: false }) required!: boolean
  @Prop({ type: Number, default: 0 }) defaultValue!: number
  @Prop({ type: Number, default: null }) value!: number

  @Prop({ type: String, default: null }) label!: string
  @Prop({ type: Number, default: Position.start }) labelPosition!: number

  @Prop({ type: Number, default: 0 }) min!: number
  @Prop({ type: Number, default: 10 }) max!: number
  @Prop({ type: Number, default: 1 }) step!: number

  @Prop({ type: Object, default: () => {} }) iconProps!: any

  Position = Position
  getArrowButtonStyles = getArrowButtonStyles

  customUpArrowButtonStyles = {}
  customDownArrowButtonStyles = {}

  internalValue: number = this.value || this.defaultValue

  private INITIAL_STEP_DELAY = 400;
  private STEP_DELAY = 75;
  private interval!: number
  private timeout!: number

  private isFocused: boolean = false
  private keyboardSpinDirection = KeyboardSpinDirection.notSpinning

  get classNames (): any {
    const { theme, styles, className, disabled, isFocused, keyboardSpinDirection, labelPosition } = this

    return getClassNames(styles, {
      theme: theme!,
      disabled,
      isFocused,
      keyboardSpinDirection,
      labelPosition,
      className,
    })
  }

  @Watch('internalValue')
  private onValueChanged (value: string) {
    this.$emit('input', value)
  }

  private updateValue (value: number) {
    const newValue = precisionRound(value, this.precision)
    this.internalValue = newValue
    return newValue
  }

  private onIncrement () {
    const newValue = Math.min(this.internalValue + this.step, this.max)
    return this.updateValue(newValue)
  }

  private onDecrement () {
    const newValue = Math.max(this.internalValue - this.step, this.min)
    return this.updateValue(newValue)
  }

  private startSpin (dir: number) {
    let newValue = dir === 1 ? this.onIncrement() : this.onDecrement()
    newValue = precisionRound(newValue, this.precision)
    this.internalValue = newValue

    this.timeout = setTimeout(() => {
      this.interval = setInterval(
        () => {
          let newValue = dir === 1 ? this.onIncrement() : this.onDecrement()
          newValue = precisionRound(newValue, this.precision)
          this.internalValue = newValue
        },
        this.STEP_DELAY,
      )
    }, this.INITIAL_STEP_DELAY)
  }

  get precision () {
    const precision = Math.max(calculatePrecision(this.step), 0)
    return precision
  }

  private stopSpin () {
    clearTimeout(this.timeout)
    clearInterval(this.interval)
  }

  render (h: CreateElement) {
    const { theme, customUpArrowButtonStyles, customDownArrowButtonStyles, classNames, labelPosition, iconProps, label, internalValue } = this

    const $label = h('div', { class: classNames.labelWrapper }, [
      iconProps && h(Icon, {
        class: classNames.icon,
        props: {
          ...iconProps,
        },
      }),
      h('Label', {
        class: classNames.label,
        attrs: {
          for: `SpinButton${this.uid}`,
        },
      }, label),
    ])

    const $spinButtonWrapper = h('div', { class: classNames.spinButtonWrapper }, [
      h('input', {
        class: classNames.input,
        attrs: {
          id: `SpinButton${this.uid}`,
          value: internalValue,
          type: 'text',
          role: 'spinbutton',
        },
        on: {
          focus: () => (this.isFocused = true),
          blur: () => (this.isFocused = false),
          onput: ev => (this.internalValue = +(ev.target.value || 0)),
        },
      }),
      h('span', { class: classNames.arrowBox }, [
        h(IconButton, {
          staticClass: 'ms-UpButton',
          props: {
            styles: getArrowButtonStyles(theme, true, customUpArrowButtonStyles),
            iconProps: { iconName: 'ChevronUpSmall' },
          },
          nativeOn: {
            mousedown: () => this.startSpin(1),
            mouseup: () => this.stopSpin(),
          },
        }),
        h(IconButton, {
          staticClass: 'ms-DownButton',
          props: {
            styles: getArrowButtonStyles(theme, false, customDownArrowButtonStyles),
            iconProps: { iconName: 'ChevronDownSmall' },
          },
          nativeOn: {
            mousedown: () => this.startSpin(-1),
            mouseup: () => this.stopSpin(),
          },
        }),
      ]),
    ])

    return h('div', { class: classNames.root }, [
      (labelPosition !== Position.bottom && (iconProps || label)) && $label,
      $spinButtonWrapper,
      (labelPosition === Position.bottom && (iconProps || label)) && $label,
    ])
  }
}

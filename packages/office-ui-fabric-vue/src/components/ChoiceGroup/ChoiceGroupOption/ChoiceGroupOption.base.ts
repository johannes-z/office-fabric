import { classNamesFunction } from '@uifabric-vue/utilities'
import { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'
import { Icon } from '../../Icon'
import { Image } from '../../Image'
import { IChoiceGroupOptionProps, IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles } from './ChoiceGroupOption.types'

const getClassNames = classNamesFunction<IChoiceGroupOptionStyleProps, IChoiceGroupOptionStyles>()

@Component
export class ChoiceGroupOptionBase extends BaseComponent<IChoiceGroupOptionProps> {
  @Prop() id!: string
  @Prop() text!: string
  @Prop() iconProps!: any
  @Prop() imageSrc!: any
  @Prop() selectedImageSrc!: any
  @Prop() imageAlt!: any
  @Prop() checked!: boolean
  @Prop() disabled!: boolean
  @Prop({ default: () => ({ width: 32, height: 32 }) }) imageSize!: any
  @Prop() focused!: boolean

  get classNames () {
    const { styles, theme, iconProps, imageSrc, checked, disabled, imageSize, focused } = this

    return getClassNames(styles, {
      theme: theme!,
      hasIcon: !!iconProps,
      hasImage: !!imageSrc,
      checked,
      disabled,
      imageIsLarge: !!imageSrc && (imageSize.width > 71 || imageSize.height > 71),
      imageSize,
      focused,
    })
  }

  render (h: CreateElement) {
    const { id, classNames, text, imageSrc, imageAlt, imageSize, selectedImageSrc, iconProps, disabled } = this

    const _id = `ChoiceGroup${this.uid}`

    const $input = h('input', {
      class: classNames.input,
      attrs: {
        id: `ChoiceGroup${this.uid}-${id}`,
        name: `ChoiceGroup${this.uid}`,
        type: 'radio',
      },
    })

    const $label = h('label', {
      class: classNames.field,
      attrs: {
        for: `ChoiceGroup${this.uid}-${id}`,
      },
    }, [
      imageSrc && h('div', { class: classNames.innerField }, [
        h('div', { class: classNames.imageWrapper }, [
          h(Image, {
            props: {
              src: imageSrc,
              alt: imageAlt,
              ...imageSize,
            },
          }),
        ]),
        h('div', { class: classNames.selectedImageWrapper }, [
          h(Image, {
            props: {
              src: selectedImageSrc,
              alt: imageAlt,
              ...imageSize,
            },
          }),
        ]),
      ]),
      iconProps && h('div', { class: classNames.innerField }, [
        h('div', { class: classNames.iconWrapper }, [
          h(Icon, { props: iconProps }),
        ]),
      ]),
      (imageSrc || iconProps)
        ? h('div', { class: classNames.labelWrapper }, [
          h('span', { staticClass: 'ms-ChoiceFieldLabel' }, this.$slots.default || text),
        ])
        : h('span', { staticClass: 'ms-ChoiceFieldLabel' }, this.$slots.default || text),
    ])

    return h('div', { class: classNames.root }, [
      h('div', { class: classNames.choiceFieldWrapper }, [
        $input,
        $label,
      ]),
    ])
  }
}

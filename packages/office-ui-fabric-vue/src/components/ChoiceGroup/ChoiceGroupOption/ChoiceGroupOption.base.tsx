import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../../BaseComponent'

import { classNamesFunction } from '@uifabric-vue/utilities'

import { Icon } from '../../Icon'
import { Image } from '../../Image'
import { Label } from '../../Label'
import { IChoiceGroupOptionStyles, IChoiceGroupOptionStyleProps, IChoiceGroupOptionProps } from './ChoiceGroupOption.types'

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

  render () {
    const { id, classNames, text, imageSrc, imageAlt, imageSize, selectedImageSrc, iconProps, disabled } = this
    return (
      <div class={classNames.root}>
        <div class={classNames.choiceFieldWrapper}>
          <input id={`ChoiceGroup${this.uid}-${id}`}
            name={`ChoiceGroup${this.uid}`}
            class={classNames.input}
            disabled={this.disabled}
            type="radio" />

          <label for={`ChoiceGroup${this.uid}-${id}`} class={classNames.field}>
            {imageSrc && (
              <div class={classNames.innerField}>
                <div class={classNames.imageWrapper}>
                  <Image src={imageSrc}
                    alt={imageAlt}
                    width={imageSize.width}
                    height={imageSize.height} />
                </div>
                <div class={classNames.selectedImageWrapper}>
                  <Image src={selectedImageSrc}
                    alt={imageAlt}
                    width={imageSize.width}
                    height={imageSize.height} />
                </div>
              </div>
            )}
            {iconProps && (
              <div class={classNames.innerField}>
                <div class={classNames.iconWrapper}>
                  <Icon {...{ props: iconProps }} />
                </div>
              </div>
            )}

            {(imageSrc || iconProps) ? (
              <div class={classNames.labelWrapper}>
                <span class="ms-ChoiceFieldLabel">
                  {this.$slots.default || text}
                </span>
              </div>
            ) : (
              <span class="ms-ChoiceFieldLabel">
                {this.$slots.default || text}
              </span>
            )}
          </label>
        </div>
      </div>

    )
  }
}

import { CommandButton, IconButton } from "@/components";
import { withThemeableProps } from "@/useThemeable";
import { classNamesFunction } from "@uifabric-vue/utilities";
import { IProcessedStyleSet } from "@uifabric/merge-styles";
import Vue, { CreateElement, VNode } from "vue";
import { ISuggestionsItemStyleProps, ISuggestionsItemStyles } from "./SuggestionsItem.types";

const getClassNames = classNamesFunction<ISuggestionsItemStyleProps, ISuggestionsItemStyles>();

export const SuggestionsItem = Vue.extend({
  props: {
    ...withThemeableProps(),

    suggestionModel: { type: Object, required: true },
    isSelectedOverride: { type: Boolean, default: false },
    removeButtonIconProps: { type: Object, default: undefined },
  },

  computed: {
    classNames (): IProcessedStyleSet<ISuggestionsItemStyles> {
      const { styles, theme, className, suggestionModel, isSelectedOverride } = this
      return getClassNames(styles, {
        theme: theme!,
        className,
        suggested: suggestionModel.selected || isSelectedOverride,
      })
    }
  },

  render (h: CreateElement): VNode {
    const { classNames } = this
    return h('div', {
      class: classNames.root,
      attrs: {
        role: 'presentation'
      }
    }, [
      h(CommandButton, {
        class: classNames.itemButton,
        attrs: {
          role: 'option'
        }
      }, this.$slots.default),

      h(IconButton, {
        class: classNames.closeButton,
        props: {
          iconProps: this.removeButtonIconProps ?? { iconName: 'Cancel' },
          styles: { icon: { fontSize: '12px' }},
        }
      })
    ])
  }
})

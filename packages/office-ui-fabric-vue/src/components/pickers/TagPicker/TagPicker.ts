
import { styled } from '@/components/styled'
import Vue from 'vue'
import { BasePicker } from '../BasePicker'
import { getStyles } from '../BasePicker.styles'

const TagPickerBase = Vue.extend({
  extends: BasePicker,
})

export const TagPicker = styled(
  TagPickerBase,
  getStyles,
  undefined,
  {
    scope: 'TagPicker',
  },
)

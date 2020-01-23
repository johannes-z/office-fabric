import TextView from './Text.view'
import { getStyles } from './Text.styles'
import { VueConstructor } from 'vue'
import { createComponent } from '../createComponent'

export * from './Text.types'

export const Text: VueConstructor = createComponent(TextView, {
  displayName: 'Text',
  styles: getStyles,
  mixins: [],
})

import { styled } from '../../components/styled'
import GridBase from './Grid.vue'
import GridCell from './GridCell.vue'
import { getStyles } from './Grid.styles'
import { VueConstructor } from 'vue'

export * from './Grid.types'

export const Grid: VueConstructor = styled(
  GridBase,
  getStyles,
  undefined,
  { scope: 'Grid' }
)

export {
  GridCell,
}

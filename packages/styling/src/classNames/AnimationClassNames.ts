import { IAnimationStyles } from '../interfaces'
import { AnimationStyles } from '../styles'
import { buildClassMap } from '../utilities/buildClassMap'

export const AnimationClassNames: { [key in keyof IAnimationStyles]?: string } = buildClassMap(AnimationStyles)

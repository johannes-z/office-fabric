import styles from './PrimaryButton.module.scss?inline'
import classNames from './PrimaryButton.module.scss'
import { getStyles as baseStyles } from '@/utils'

const id = '__ms-PrimaryButton__'

export function getStyles () {
  return baseStyles(id, styles, classNames)
}

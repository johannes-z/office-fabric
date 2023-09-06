import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import styles from './Checkbox.module.scss?inline'
import { Checkbox } from '.'

describe('Checkbox', () => {
  it('has correct style', () => {
    expect(styles).toMatchSnapshot()
  })

  it('renders Checkbox correctly', () => {
    const wrapper = mount(Checkbox, {
      context: {
        staticClass: 'customClass',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

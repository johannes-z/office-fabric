import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VNodeData } from 'vue'
import { Spinner } from '.'
import styles from './Spinner.module.scss?inline'

describe('Spinner', () => {
  it('has correct style', () => {
    expect(styles).toMatchSnapshot()
  })

  it('renders Spinner correctly', () => {
    const wrapper = mount(Spinner, {
      propsData: {
        label: 'Standard spinner',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

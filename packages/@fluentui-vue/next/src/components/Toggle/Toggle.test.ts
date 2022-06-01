import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VNodeData } from 'vue'
import { Toggle } from '.'
import styles from './Toggle.module.scss?inline'

describe('Toggle', () => {
  it('has correct style', () => {
    expect(styles).toMatchSnapshot()
  })

  it('renders Toggle correctly', () => {
    const wrapper = mount(Toggle, {
      context: {
        staticClass: 'customClassName',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders onText correctly', () => {
    const wrapper = mount(Toggle, {
      propsData: {
        checked: true,
        onText: 'onText',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders offText correctly', () => {
    const wrapper = mount(Toggle, {
      propsData: {
        checked: true,
        offText: 'offText',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

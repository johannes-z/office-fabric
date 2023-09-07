import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { ProgressIndicator } from '.'

describe('ProgressIndicator', () => {
  it('renders ProgressIndicator correctly', () => {
    const wrapper = mount(ProgressIndicator, {
      propsData: {
        label: 'Test',
        description: 'Test',
        percentComplete: 0.75,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders indeterminate ProgressIndicator correctly', () => {
    const wrapper = mount(ProgressIndicator, {
      propsData: {
        label: 'Test',
        description: 'Test',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders with no progress', () => {
    const wrapper = mount(ProgressIndicator, {
      propsData: {
        label: 'Test',
        description: 'Test',
        progressHidden: true,
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders with no label or description', () => {
    const wrapper = mount(ProgressIndicator)
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders with ariaLabel', () => {
    const wrapper = mount(ProgressIndicator, {
      attrs: {
        ariaLabel: 'Test',
      },
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

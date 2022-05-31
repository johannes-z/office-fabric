import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VNodeData } from 'vue'
import { Separator } from '.'

describe('Separator', () => {
  it('has correct style', () => {
    // TODO extract styles
  })

  it('renders Separator correctly', () => {
    const wrapper = mount(Separator, {
      context: {
        children: ['test'],
      } as VNodeData,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders vertical Separator correctly', () => {
    const wrapper = mount(Separator, {
      propsData: {
        vertical: true,
      },
      context: {
        children: ['test'],
      } as VNodeData,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders align start', () => {
    const wrapper = mount(Separator, {
      propsData: {
        alignContent: 'start',
      },
      context: {
        children: ['test'],
      } as VNodeData,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders align center', () => {
    const wrapper = mount(Separator, {
      propsData: {
        alignContent: 'center',
      },
      context: {
        children: ['test'],
      } as VNodeData,
    })
    expect(wrapper.element).toMatchSnapshot()
  })

  it('renders align end', () => {
    const wrapper = mount(Separator, {
      propsData: {
        alignContent: 'end',
      },
      context: {
        children: ['test'],
      } as VNodeData,
    })
    expect(wrapper.element).toMatchSnapshot()
  })
})

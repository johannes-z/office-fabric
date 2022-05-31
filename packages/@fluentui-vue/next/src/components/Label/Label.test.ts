import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { VNodeData } from 'vue'
import { Label } from '.'

describe('Label', () => {
  it('renders Label correctly', () => {
    const component = mount(Label, {
      context: {
        children: ['test'],
      } as VNodeData,
    })
    expect(component.element).toMatchSnapshot()
  })

  // it('renders disabled Label correctly', () => {
  //   const component = mount(Label, {
  //     propsData: {
  //       disabled: true,
  //     },
  //   })
  //   expect(component.element).toMatchSnapshot()
  // })

  // it('renders required Label correctly', () => {
  //   const component = mount(Label, {
  //     propsData: {
  //       required: true,
  //     },
  //   })
  //   expect(component.element).toMatchSnapshot()
  // })

  // it('renders disabled, required Label correctly', () => {
  //   const component = mount(Label, {
  //     propsData: {
  //       disabled: true,
  //       required: true,
  //     },
  //   })
  //   expect(component.element).toMatchSnapshot()
  // })
})

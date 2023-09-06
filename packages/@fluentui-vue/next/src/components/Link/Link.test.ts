import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { VNodeData } from 'vue'
import styles from './Link.module.scss?inline'
import { Link } from '.'

describe('Link', () => {
  it('has correct style', () => {
    expect(styles).toMatchSnapshot()
  })

  it('renders Link correctly', () => {
    const component = mount(Link, {
      propsData: {
        href: '#',
      },
      context: {
        children: ['test'],
      } as VNodeData,
    })
    expect(component.element).toMatchSnapshot()
  })

  it('renders disabled Link correctly', () => {
    const component = mount(Link, {
      propsData: {
        href: '#',
        disabled: true,
      },
    })
    expect(component.element).toMatchSnapshot()
  })

  it('renders Link with no href as a button', () => {
    const component = mount(Link)
    expect(component.element).toMatchSnapshot()
  })

  it('Set type=button property when link is a button', () => {
    const component = mount(Link)

    expect(Object.keys(component.find('button').attributes())).toContain('type')
    expect(component.find('button').attributes('type')).toBe('button')
  })

  it('renders disabled Link with no href as a button correctly', () => {
    const component = mount(Link, {
      propsData: {
        disabled: true,
      },
    })
    expect(component.element).toMatchSnapshot()
  })

  it('renders Link with a custom class name', () => {
    const component = mount(Link, {
      propsData: {
        href: '#',
      },
      context: {
        class: 'customClassName',
      },
    })
    expect(component.classes()).toContain('customClassName')
  })

  it('renders Link with "as=div" a div element', () => {
    const component = mount(Link, {
      propsData: {
        href: '#',
        as: 'div',
      },
      context: {
        class: 'customClassName',
      },
    })
    expect(component.element).toMatchSnapshot()
  })

  it('supports non button/anchor html attributes when "as=" is used', () => {
    const component = mount(Link, {
      propsData: {
        href: '#',
        as: 'input',
      },
      context: {
        class: 'customClassName',
      },
      attrs: {
        type: 'text',
        value: 'This is an input.',
      },
    })
    expect(component.element).toMatchSnapshot()
  })
})

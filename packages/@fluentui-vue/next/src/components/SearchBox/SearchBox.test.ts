import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { SearchBox } from '.'

describe('SearchBox', () => {
  // it('has correct style', () => {
  //   expect(styles).toMatchSnapshot()
  // })

  it('renders SearchBox correctly', () => {
    const wrapper = mount(SearchBox)
    expect(wrapper.element).toMatchSnapshot()
  })
})

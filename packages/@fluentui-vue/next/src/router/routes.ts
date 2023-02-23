import type { INavLinkGroup } from '../components/Nav/Nav.types'

const routes: any[] = []

function defineRoute({ path, name, component }) {
  const route = {
    path,
    name,
    component,
  }
  routes.push({
    path,
    name,
    component,
  })

  return {
    name,
    url: path,
    key: path,
  }
}

export const nav: INavLinkGroup[] = [
  {
    links: [{
      name: 'Basic Inputs',
      links: [
        defineRoute({
          path: '/Button',
          name: 'Button',
          component: () => import('../views/ButtonPage.vue'),
        }),
        defineRoute({
          path: '/Checkbox',
          name: 'Checkbox',
          component: () => import('../views/CheckboxPage.vue'),
        }),
        defineRoute({
          path: '/Label',
          name: 'Label',
          component: () => import('../views/LabelPage.vue'),
        }),
        defineRoute({
          path: '/Link',
          name: 'Link',
          component: () => import('../views/LinkPage.vue'),
        }),
        defineRoute({
          path: '/SearchBox',
          name: 'SearchBox',
          component: () => import('../views/SearchBoxPage.vue'),
        }),
        defineRoute({
          path: '/TextField',
          name: 'TextField',
          component: () => import('../views/TextFieldPage.vue'),
        }),
        defineRoute({
          path: '/Toggle',
          name: 'Toggle',
          component: () => import('../views/TogglePage.vue'),
        }),
      ],
      isExpanded: true,
    }],
  },
]

export { routes }

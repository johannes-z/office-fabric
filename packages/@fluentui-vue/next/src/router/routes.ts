import { useRouter } from 'vue-router'
import type { INavLink, INavLinkGroup } from '../components/Nav/Nav.types'

const routes: any[] = []

function defineRoute({ path, name, component }) {
  const route = {
    path,
    name,
    component,
  }
  routes.push(route)

  return {
    name,
    url: path,
    key: path,
  }
}

export const nav = [
  {
    links: [{
      key: 'Basic Inputs',
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
    },
    {
      name: 'Items & Lists',
      key: 'Items & Lists',
      links: [
        defineRoute({
          path: '/Persona',
          name: 'Persona',
          component: () => import('../views/PersonaPage.vue'),
        }),
      ],
      isExpanded: true,
    },
    {
      name: 'Commands, Menus & Navs',
      key: 'Commands, Menus & Navs',
      links: [
        defineRoute({
          path: '/Breadcrumb',
          name: 'Breadcrumb',
          component: () => import('../views/BreadcrumbPage.vue'),
        }),
        defineRoute({
          path: '/ContextualMenu',
          name: 'ContextualMenu',
          component: () => import('../views/ContextualMenuPage.vue'),
        }),
        defineRoute({
          path: '/CommandBar',
          name: 'CommandBar',
          component: () => import('../views/CommandBarPage.vue'),
        }),
      ],
      isExpanded: true,
    },
    {
      name: 'Progress',
      key: 'Progress',
      links: [
        defineRoute({
          path: '/ProgressIndicator',
          name: 'ProgressIndicator',
          component: () => import('../views/ProgressIndicatorPage.vue'),
        }),
        defineRoute({
          path: '/Spinner',
          name: 'Spinner',
          component: () => import('../views/SpinnerPage.vue'),
        }),
      ],
      isExpanded: true,
    },
    {
      name: 'Surfaces',
      key: 'Surfaces',
      links: [
        defineRoute({
          path: '/Callout',
          name: 'Callout',
          component: () => import('../views/CalloutPage.vue'),
        }),
        defineRoute({
          path: '/Dialog',
          name: 'Dialog',
          component: () => import('../views/DialogPage.vue'),
        }),
        defineRoute({
          path: '/Modal',
          name: 'Modal',
          component: () => import('../views/ModalPage.vue'),
        }),
      ],
      isExpanded: true,
    },
    {
      name: 'Utilities',
      key: 'Utilities',
      links: [
        defineRoute({
          path: '/Icon',
          name: 'Icon',
          component: () => import('../views/IconPage.vue'),
        }),
        defineRoute({
          path: '/Image',
          name: 'Image',
          component: () => import('../views/ImagePage.vue'),
        }),
        defineRoute({
          path: '/Separator',
          name: 'Separator',
          component: () => import('../views/SeparatorPage.vue'),
        }),
        defineRoute({
          path: '/Stack',
          name: 'Stack',
          component: () => import('../views/StackPage.vue'),
        }),
        defineRoute({
          path: '/Text',
          name: 'Text',
          component: () => import('../views/TextPage.vue'),
        }),
      ],
      isExpanded: true,
    }],
  },
]

export { routes }

const routes: any[] = []

function defineRoute({ path, name, component, ...rest }) {
  const route = {
    path,
    name,
    component,
  }
  routes.push(route)

  return {
    ...rest,
    name,
    url: path,
    key: path,
    to: path,
  }
}

export const nav = [
  {
    links: [
      defineRoute({
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue'),
      }),
    ],
  },
  {
    links: [{
      key: 'Basic Inputs',
      name: 'Basic Inputs',
      isExpanded: false,
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
          component: () => import('../views/Label/LabelPage.vue'),
        }),
        defineRoute({
          path: '/Link',
          name: 'Link',
          component: () => import('../views/LinkPage.vue'),
        }),
        defineRoute({
          path: '/Rating',
          name: 'Rating',
          component: () => import('../views/RatingPage.vue'),
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
          component: () => import('../views/Toggle/TogglePage.vue'),
        }),
      ],
    },
    {
      name: 'Galleries & Pickers',
      key: 'Galleries & Pickers',
      isExpanded: false,
      links: [
        defineRoute({
          path: '/Calendar',
          name: 'Calendar',
          component: () => import('../views/Calendar/CalendarPage.vue'),
        }),
        defineRoute({
          path: '/SwatchColorPicker',
          name: 'SwatchColorPicker',
          component: () => import('../views/SwatchColorPickerPage.vue'),
        }),
      ],
    },
    {
      name: 'Items & Lists',
      key: 'Items & Lists',
      isExpanded: false,
      links: [
        defineRoute({
          path: '/ActivityItem',
          name: 'ActivityItem',
          component: () => import('../views/ActivityItemPage.vue'),
        }),
        defineRoute({
          path: '/Persona',
          name: 'Persona',
          component: () => import('../views/PersonaPage.vue'),
        }),
      ],
    },
    {
      name: 'Commands, Menus & Navs',
      key: 'Commands, Menus & Navs',
      isExpanded: false,
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
    },
    {
      name: 'Notification & Engagement',
      key: 'Notification & Engagement',
      isExpanded: false,
      links: [
        defineRoute({
          path: '/MessageBar',
          name: 'MessageBar',
          component: () => import('../views/MessageBarPage.vue'),
        }),
      ],
    },
    {
      name: 'Progress',
      key: 'Progress',
      isExpanded: false,
      links: [
        defineRoute({
          path: '/ProgressIndicator',
          name: 'ProgressIndicator',
          component: () => import('../views/ProgressIndicator/ProgressIndicatorPage.vue'),
        }),
        defineRoute({
          path: '/Spinner',
          name: 'Spinner',
          component: () => import('../views/Spinner/SpinnerPage.vue'),
        }),
      ],
    },
    {
      name: 'Surfaces',
      key: 'Surfaces',
      isExpanded: false,
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
    },
    {
      name: 'Utilities',
      key: 'Utilities',
      isExpanded: false,
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
          path: '/Layer',
          name: 'Layer',
          component: () => import('../views/LayerPage.vue'),
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
    }],
  },
]

export { routes }

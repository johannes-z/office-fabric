const components = [
  'Button',
  'Checkbox',
  'Label',
  'SpinButton',
  'TextField',
  'Toggle',
  'Text',
  'Link',
  'ChoiceGroup',
  'Image',
  'Separator',
  'Nav',
  'ProgressIndicator',
  'Spinner',
  'Slider',
  'Layer',
  'Callout',
  'SearchBox',
  'Rating',
  'Modal',
  'Overlay',
  'Panel',
]

const routes = components.map(name => ({
  name,
  path: `/${name}`,
  component: () => import(`@/pages/${name}.vue`),
}))

export default routes

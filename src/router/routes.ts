const components = [
  'Button',
  'Checkbox',
  'Label',
  'SpinButton',
  'TextField',
  'Toggle',
  'Text',
  'ChoiceGroup',
  'Image',
  'Separator',
  'Nav',
  'ProgressIndicator',
  'Spinner',
  'Slider',
  'Layer',
  'Callout',
]

const routes = components.map(name => ({
  name,
  path: `/${name}`,
  component: () => import(`@/pages/${name}.vue`),
}))

export default routes

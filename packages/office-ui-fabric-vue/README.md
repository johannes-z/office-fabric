<!-- ## Caveats

Functional components in Vue have no instance, so it's not possible to call methods of the component. They also omit the
`@Component` decorator:

```ts
export default class SomeComponent extends StatelessComponent {
  render (h: CreateElement, context: RenderContext) {
    const self = context.injections.self
    self.myFunction()
  }

  myFunction () {
    console.log('doSomething')
  }
}
```

In addition, functional components have to be created using the `createComponent` helper function, that decorates the
class (`SomeComponentBase`) and injects the `self` property.

```ts
export const SomeComponent: VueConstructor = createComponent(SomeComponentBase, {
  displayName: 'SomeComponent',
  styles: getStyles,
  // use any component options
  mixins: [],
})
``` -->
# Office UI Fabric Vue

## Differences to React
### Class Binding
React uses `className` to bind CSS-classes to elements. In Vue you can use `class` instead. `className` is still
supported via the `styled` HoC in Office UI Fabric Vue.

### Content Distribution
Instead of using `onRender<Something>`, the Vue components use `slots` to customize rendering. I.e., a react component
with `onRenderComment (comment: string) ...` is `<template #comment="{ comment }">...</template>` in Vue.

## Contributing

### Caveats
* Use `JSX/TSX` instead of `SFC`s when writing a recursive template to avoid circular imports.
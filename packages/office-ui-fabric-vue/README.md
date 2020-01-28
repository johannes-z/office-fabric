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
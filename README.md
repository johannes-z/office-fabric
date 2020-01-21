# Office UI Fabric Vue (WIP)
This is a WIP of Office UI Fabric Vue. It aims to use as much official `Office UI Fabric React` code as possible, by
re-using official files and packages.

# Important
This library is built on top of Microsoft's `office-ui-fabric-react`, more
spefically the packages `@uifabric/merge-styles`, `@uifabric/styling`, and
`@uifabric/utilities`. For maximum design parity, office-fabric uses
`office-ui-fabric-react`'s component `.style.ts` definitions.

`@uifabric/merge-styles`, `@uifabric/styling`, `@uifabric/utilities` and the
original `.style.ts` definitions of the components are subject to Microsoft's
license models. Please check `office-ui-fabric-react` for more information.

# office-fabric

# Contributing
## Projects
`office-ui-fabric-vue` is a yarn monorepo, consisting of 3 projects:

1. `@uifabric-vue/office-ui-fabric-vue`, the main project defining all the vue components for Fabric.
2. `@uifabric-vue/utilities`, which is basically a fork of `@uifabric/utilities` but re-written without `react`
   dependencies.
3. `api-docs` (WIP), the homepage and showcase of the components.

## Vue Caveats
* `class` have to be passed to subcomponents using the `class-name` property,
  because Vue doesn't expose `$attrs.class`.

## Project setup
```
yarn
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```


## Labels
### Progress
Each component has one of the following progress states:

<dl>
  <dt>missing</dt>
  <dd>Development of this component has not yet started</dd>

  <dt>wip</dt>
  <dd>Development of this component has started, and the component is not yet ready for use</dd>

  <dt>done</dt>
  <dd>This component is ready to be used, but some features available in the react version aren't implemented yet</dd>

  <dt>complete</dt>
  <dd>This component is ready and has feature parity with its react counterpart.</dd>
</dl>

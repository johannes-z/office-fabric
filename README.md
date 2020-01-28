# Office UI Fabric Vue (WIP)
This is a WIP of Office UI Fabric Vue. It aims to use as much official `Office UI Fabric React` code as possible, by
re-using official files and packages.

# Important
This library is built on top of Microsoft's `office-ui-fabric-react`, more spefically the packages
`@uifabric/merge-styles`, `@uifabric/styling`, and `@uifabric/utilities`. For maximum design parity, office-fabric uses
`office-ui-fabric-react`'s component `.style.ts` definitions.

`@uifabric/merge-styles`, `@uifabric/styling`, `@uifabric/utilities` and the original `.style.ts` definitions of the
components are subject to Microsoft's license models. Please check `office-ui-fabric-react` for more information.

The `Vue`-components also borrow code from `office-ui-fabric-react`, making it easier to merge changes.

# Usage
**WIP**

`api-docs` can be used as an example on how to use `office-ui-fabric-vue`.

# Contributing
## Projects
`office-ui-fabric-vue` is a `yarn` monorepo, consisting of 3 projects:

1. `@uifabric-vue/office-ui-fabric-vue`, the main project defining all the vue components for Fabric.
2. `@uifabric-vue/utilities`, which is basically a fork of `@uifabric/utilities` but re-written without `react`
   dependencies.
3. `api-docs` (WIP), the homepage and showcase of the components.

## Vue Caveats
* ~~`class` has to be passed to subcomponents using the `class-name` property, because Vue doesn't expose
  `this.$attrs.class`.~~

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

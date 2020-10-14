# Office UI Fabric Vue

## Differences to React
### Class Binding
React uses `className` to bind CSS-classes to elements. In Vue you can use `class` instead. `className` is still
supported via the `styled` HoC in Office UI Fabric Vue.

### Content Distribution
Instead of using `onRender<Something>`, the Vue components use `slots` to customize rendering. I.e., a react component
with `onRenderComment (comment: string) ...` is `<template #comment="{ comment }">...</template>` in Vue.

## IMPORTANT
There are still references to `@uifabric/utilities` which has a `react` dependency. As of today, you will have to create
an alias to `@uifabric-vue/utilities` to fix this:

### Rollup
```js
{
  ...
  plugins: [
    alias({
      resolve: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      entries: [
        { find: /@uifabric\/utilities/, replacement: '@uifabric-vue/utilities' },
      ],
    }),
  ]
  ...
}
```

### Webpack
```js
{
  ...
  resolve: {
    alias: {
      '@uifabric/utilities': '@uifabric-vue/utilities',
    },
  },
  ...
}
```
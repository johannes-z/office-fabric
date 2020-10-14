# Office UI Fabric Vue

## Differences to React
### Class Binding
React uses `className` to bind CSS-classes to elements. In Vue you can use `class` instead. `className` is still
supported via the `styled` HoC in Office UI Fabric Vue.

### Content Distribution
Instead of using `onRender<Something>`, the Vue components use `slots` to customize rendering. I.e., a react component
with `onRenderComment (comment: string) ...` is `<template #comment="{ comment }">...</template>` in Vue.

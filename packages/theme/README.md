# @fluentui-vue/theme
This is a port of the React `@fluentui/theme` package to Vue.

See the original README for usage. You have to update `@fluentui/theme` to `@fluentui-vue/theme`

## Getting started
If you do not specify your own color palette, the default blue color palette is used. Instead of using JS variables for
colors, `@fluentui-vue/theme` uses CSS Variables for all color slots.

All `@fluentui-vue/theme` CSS Variables are prefixed by `fluentui-`, for example: `--fluentui-themePrimary`.

### Creating a Theme
Use the official [Microsoft *Fluent UI Theme Designer*](https://aka.ms/themedesigner) to create a theme.

## Usage
You can provide custom color palettes in multiple ways:

### CSS Variables
You can directly define CSS Variables in your DOM:

```html
:root {
  --fluentui-themePrimary: #a00;
}
```

### `@microsoft/load-themed-styles` API
The `@microsoft/load-themed-styles` `loadStyles` API allows you to create responsive CSS Variable definitions.

First, add the CSS Variable definitions with the default color palette:

```ts
import { loadStyles } from '@microsoft/load-themed-styles'

loadStyles(`:root {
  --fluentui-bodyBackground: "[theme:bodyBackground, default: #ffffff]";
  --fluentui-bodyText: "[theme:bodyText, default: #000000]";
  --fluentui-black: "[theme:black, default: #000000]";
  --fluentui-white: "[theme:white, default: #ffffff]";
  --fluentui-themePrimary: "[theme:themePrimary, default: #0078d4]";
  --fluentui-themeLighterAlt: "[theme:themeLighterAlt, default: #eff6fc]";
  --fluentui-themeLighter: "[theme:themeLighter, default: #deecf9]";
  --fluentui-themeLight: "[theme:themeLight, default: #c7e0f4]";
  --fluentui-themeTertiary: "[theme:themeTertiary, default: #71afe5]";
  --fluentui-themeSecondary: "[theme:themeSecondary, default: #2b88d8]";
  --fluentui-themeDarkAlt: "[theme:themeDarkAlt, default: #106ebe]";
  --fluentui-themeDark: "[theme:themeDark, default: #005a9e]";
  --fluentui-themeDarker: "[theme:themeDarker, default: #004578]";
  --fluentui-neutralLighterAlt: "[theme:neutralLighterAlt, default: #faf9f8]";
  --fluentui-neutralLighter: "[theme:neutralLighter, default: #f3f2f1]";
  --fluentui-neutralLight: "[theme:neutralLight, default: #edebe9]";
  --fluentui-neutralQuaternaryAlt: "[theme:neutralQuaternaryAlt, default: #e1dfdd]";
  --fluentui-neutralQuaternary: "[theme:neutralQuaternary, default: #d0d0d0]";
  --fluentui-neutralTertiaryAlt: "[theme:neutralTertiaryAlt, default: #c8c6c4]";
  --fluentui-neutralTertiary: "[theme:neutralTertiary, default: #a19f9d]";
  --fluentui-neutralSecondary: "[theme:neutralSecondary, default: #605e5c]";
  --fluentui-neutralSecondaryAlt: "[theme:neutralSecondaryAlt, default: #8a8886]";
  --fluentui-neutralPrimaryAlt: "[theme:neutralPrimaryAlt, default: #3b3a39]";
  --fluentui-neutralPrimary: "[theme:neutralPrimary, default: #323130]";
  --fluentui-neutralDark: "[theme:neutralDark, default: #201f1e]";
}`)
```

Now, whenever you call `loadTheme`, the CSS Variables are updated automatically:

```js
import { loadTheme } from '@microsoft/load-themed-styles'

loadTheme({
  themePrimary: '#228566',
  themeLighterAlt: '#f3faf8',
  themeLighter: '#d0ebe3',
  themeLight: '#aadacb',
  themeTertiary: '#65b69c',
  themeSecondary: '#339375',
  themeDarkAlt: '#1f775b',
  themeDark: '#1a654d',
  themeDarker: '#134a39',
  neutralLighterAlt: '#faf9f8',
  neutralLighter: '#f3f2f1',
  neutralLight: '#edebe9',
  neutralQuaternaryAlt: '#e1dfdd',
  neutralQuaternary: '#d0d0d0',
  neutralTertiaryAlt: '#c8c6c4',
  neutralTertiary: '#a19f9d',
  neutralSecondary: '#605e5c',
  neutralSecondaryAlt: '#8a8886',
  neutralPrimaryAlt: '#3b3a39',
  neutralPrimary: '#323130',
  neutralDark: '#201f1e',
  black: '#000000',
  white: '#ffffff',
})
```

> # @fluentui/theme
> 
> **Basic building blocks for [Fluent UI React](https://developer.microsoft.com/en-us/> fluentui) Themes**
> 
> Define your own theme based on an existing theme:
> 
> ```js
> import { createTheme, Theme, FontWeights } from '@fluentui/theme';
> 
> export const MyTheme: Theme = createTheme({
>   components: {
>     Button: {
>       variants: {
>         fontWeight: FontWeights.semibold,
>         paddingLeft: '24px',
>         paddingRight: '24px',
>       },
>     },
>   },
> });
> ```
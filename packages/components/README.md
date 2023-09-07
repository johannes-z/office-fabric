## IE11 Support

Requires a [CSS Vars Polyfill](https://github.com/nuxodin/ie11CustomProperties).

## Styling & Theming

All components use CSS vars, which allows for very flexible theming.

### CSS in JS
This library uses CSS in JS for multiple reasons:

* Fluent UI React uses CSS in JS, so we can just use their style definitions.
* You can import individual components with full tree-shaking, without the need of babel plugins.
* Components are JS only, and don't require any fancy tool chains.

#### Cons

* The dependencies for CSS in JS make the bundle a bit bigger, which becomes neglectable when importing multiple
  components.
* Performance is slower than pure CSS

### Color Palette

https://aka.ms/themedesigner.

```css
:root {
  --themePrimary: #0078d4;
  --themeLighterAlt: #eff6fc;
  --themeLighter: #deecf9;
  --themeLight: #c7e0f4;
  --themeTertiary: #71afe5;
  --themeSecondary: #2b88d8;
  --themeDarkAlt: #106ebe;
  --themeDark: #005a9e;
  --themeDarker: #004578;
  --neutralLighterAlt: #faf9f8;
  --neutralLighter: #f3f2f1;
  --neutralLight: #edebe9;
  --neutralQuaternaryAlt: #e1dfdd;
  --neutralQuaternary: #d0d0d0;
  --neutralTertiaryAlt: #c8c6c4;
  --neutralTertiary: #a19f9d;
  --neutralSecondaryAlt: #8a8886;
  --neutralSecondary: #605e5c;
  --neutralPrimaryAlt: #3b3a39;
  --neutralPrimary: #323130;
  --neutralDark: #201f1e;
  --black: #000000;
  --white: #ffffff;
}
```

`neutralSecondaryAlt` is not exported by ThemeDesigner.

### `loadStyles`

### Override Styles 

#### Using `style`

See [Vue - Class and Style Bindings](https://v2.vuejs.org/v2/guide/class-and-style.html).

#### Using `styles`

`styles` is an object that allows you to target specific elements.

```js
{
  root: {
    fontWeight: 'bold'
  },
  label: {
    color: 'red'
  }
}
```

```html
<div class="root" style="font-weight: bold">
  <div class="label" style="color: red;"></div>
</div>
```

#### Using `theme`

`theme` is an object that allows you to override specific CSS Variables within the element. This requires a CSS Vars Polyfill or a modern browser.

```js
{
  palette: {
    themePrimary: '#0f0'
  }
}
```

```html
<div style="--themePrimary: #0f0;">/div>
```
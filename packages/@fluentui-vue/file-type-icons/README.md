# @fluentui-vue/file-type-icons
This is a port of the React `@fluentui/react-file-type-icons` package to Vue.

See the original README for usage. You have to update `@fluentui/react-file-type-icons` to `@fluentui-vue/file-type-icons`

## Getting Started
```tsx
import { initializeFileTypeIcons } from '@fluentui-vue/file-type-icons';

// Register icons and pull the fonts from the default SharePoint cdn.
initializeFileTypeIcons();

// ...or, register icons and pull the fonts from your own cdn:
initializeFileTypeIcons('https://my.cdn.com/path/to/icons/');
```

## Usage in code

### Template
```html
<template>
  <FluentIcon v-bind="iconProps" />
</template>
```

### Script
```ts
import Vue from 'vue'
import { Icon } from '@fluentui-vue/components';
import { getFileTypeIconProps } from '@fluentui-vue/file-type-icons';

export default Vue.extend({
  components: {
    FluentIcon: Icon,
  },

  computed: {
    iconProps () {
      return getFileTypeIconProps({ extension: 'docx', size: 16 })
    }
  }
})
```

> # @fluentui/react-file-type-icons
> 
> **File type icons for [Fluent UI React](https://developer.microsoft.com/en-us/fluentui)**
> ([formerly Office UI Fabric React](https://developer.microsoft.com/en-us/office/blogs/ui-fabric-is-evolving-into-fluent-ui/))
> 
> This package includes a collection of icons to represent file types.
> 
> ## Getting started
> 
> If you are using Fluent UI React components, you can make all file type icons available by calling the `initializeFileTypeIcons` function from the `@fluentui/react-file-type-icons` package:
> 
> ```tsx
> import { initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
> 
> // Register icons and pull the fonts from the default SharePoint cdn.
> initializeFileTypeIcons();
> 
> // ...or, register icons and pull the fonts from your own cdn:
> initializeFileTypeIcons('https://my.cdn.com/path/to/icons/');
> ```
> 
> **NOTE:** Do not use the `item-types-fluent` icon set that was previously uploaded to the Fabric CDN; it is deprecated.
> 
> ## Usage in code
> 
> If you are using Fluent UI React, you can use the `Icon` component and pass in the corresponding icon properties to render a given icon.
> 
> ```tsx
> import { Icon } from '@fluentui/react/lib/Icon';
> import { getFileTypeIconProps } from '@fluentui/react-file-type-icons';
> 
> <Icon {...getFileTypeIconProps({ extension: 'docx', size: 16 })} />;
> ```
> 
> ## Notes
> 
> See [GitHub](https://github.com/microsoft/fluentui) for more details on the Fluent UI React project and packages within.
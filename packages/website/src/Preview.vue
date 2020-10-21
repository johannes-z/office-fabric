<template>
  <div class="wrapper">
    <div class="topNav" :style="{ boxShadow: theme.effects.elevation8 }">
      <DefaultButton @click.prevent.native="toggleTheme('light')">Light Theme</DefaultButton>
      <DefaultButton @click.prevent.native="toggleTheme('dark')">Dark Theme</DefaultButton>
    </div>

    <div class="page">
      <div class="sidebar">
        <Nav :groups="groups" />
      </div>
      <div class="content">
        <router-view v-bind="null" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { ThemeProvider, ActionButton, DefaultButton, IPartialTheme, loadTheme, Nav, Callout, Spinner } from '@uifabric-vue/office-ui-fabric-vue'
import { createTheme, DefaultEffects, getTheme } from '@uifabric/styling'

const publicPath = process.env.NODE_ENV === 'production'
  ? '/office-fabric'
  : ''

@Component({
  components: { ActionButton, ThemeProvider, DefaultButton, Nav, Callout, Spinner },
})
export default class Preview extends Vue {
  // @ts-ignore
  theme = getTheme()
  target = document.body

  groups = [
    {
      links: [{
        name: 'Office UI Fabric Vue',
        isExpanded: true,
        key: 'Main',
        links: [
          { name: 'Get started', key: 'Start', href: publicPath + '/#/' },
        ],
      }, {
        name: 'Components',
        isExpanded: true,
        links: [{
          name: 'Basic Inputs',
          isExpanded: true,
          links: [
            { name: 'Button WIP', key: 'Button', href: publicPath + '/#/Button' },
            { name: 'Checkbox WIP', key: 'Checkbox', href: publicPath + '/#/Checkbox' },
            { name: 'ChoiceGroup', key: 'ChoiceGroup', href: publicPath + '/#/ChoiceGroup' },
            { name: 'ComboBox WIP', key: 'ComboBox', href: publicPath + '/#/ComboBox' },
            { name: 'Dropdown WIP', key: 'Dropdown', href: publicPath + '/#/Dropdown' },
            { name: 'Label', key: 'Label', href: publicPath + '/#/Label' },
            { name: 'Link', key: 'Link', href: publicPath + '/#/Link' },
            { name: 'Rating', key: 'Rating', href: publicPath + '/#/Rating' },
            { name: 'SearchBox', key: 'SearchBox', href: publicPath + '/#/SearchBox' },
            { name: 'Slider', key: 'Slider', href: publicPath + '/#/Slider' },
            { name: 'SpinButton', key: 'SpinButton', href: publicPath + '/#/SpinButton' },
            { name: 'TextField', key: 'TextField', href: publicPath + '/#/TextField' },
            { name: 'Toggle', key: 'Toggle', href: publicPath + '/#/Toggle' },
          ],
        }, {
          name: 'Galleries & Pickers',
          isExpanded: true,
          links: [
            { name: 'SwatchColorPicker WIP', key: 'SwatchColorPicker', href: publicPath + '/#/SwatchColorPicker' },
          ],
        }, {
          name: 'Items & Lists',
          isExpanded: true,
          links: [
            { name: 'ActivityItem WIP', key: 'ActivityItem', href: publicPath + '/#/ActivityItem' },
            {
              name: 'DetailsList',
              isExpanded: true,
              links: [
                { name: 'DetailsList', key: 'DetailsList', href: publicPath + '/#/DetailsList' },
              ],
            },
            { name: 'BasicList WIP', key: 'BasicList', href: publicPath + '/#/BasicList' },
            { name: 'Facepile WIP', key: 'Facepile', href: publicPath + '/#/Facepile' },
            { name: 'Persona WIP', key: 'Persona', href: publicPath + '/#/Persona' },
          ],
        }, {
          name: 'Commands, Menus & Navs',
          isExpanded: true,
          links: [
            { name: 'Breadcrumb WIP', key: 'Breadcrumb', href: publicPath + '/#/Breadcrumb' },
            { name: 'OverflowSet WIP', key: 'OverflowSet', href: publicPath + '/#/OverflowSet' },
          ],
        }, {
          name: 'Notification & Engagement',
          isExpanded: true,
          links: [
            { name: 'MessageBar', key: 'MessageBar', href: publicPath + '/#/MessageBar' },
          ],
        }, {
          name: 'Progress',
          isExpanded: true,
          links: [
            { name: 'ProgressIndicator', key: 'ProgressIndicator', href: publicPath + '/#/ProgressIndicator' },
            { name: 'Shimmer WIP', key: 'Shimmer', href: publicPath + '/#/Shimmer' },
            { name: 'Spinner', key: 'Spinner', href: publicPath + '/#/Spinner' },
          ],
        }, {
          name: 'Surfaces',
          isExpanded: true,
          links: [
            { name: 'Callout WIP', key: 'Callout', href: publicPath + '/#/Callout' },
            { name: 'Dialog WIP', key: 'Dialog', href: publicPath + '/#/Dialog' },
            { name: 'Modal WIP', key: 'Modal', href: publicPath + '/#/Modal' },
            { name: 'Panel WIP', key: 'Panel', href: publicPath + '/#/Panel' },
            { name: 'ScrollablePane WIP', key: 'ScrollablePane', href: publicPath + '/#/ScrollablePane' },
          ],
        }, {
          name: 'Utilities',
          isExpanded: true,
          links: [
            { name: 'Icon WIP', key: 'Icon', href: publicPath + '/#/Icon' },
            { name: 'Image WIP', key: 'Image', href: publicPath + '/#/Image' },
            { name: 'Layer', key: 'Layer', href: publicPath + '/#/Layer' },
            { name: 'Overlay', key: 'Overlay', href: publicPath + '/#/Overlay' },
            { name: 'ResizeGroup', key: 'ResizeGroup', href: publicPath + '/#/ResizeGroup' },
            { name: 'Separator', key: 'Separator', href: publicPath + '/#/Separator' },
            { name: 'Stack WIP', key: 'Stack', href: publicPath + '/#/Stack' },
            { name: 'Text', key: 'Text', href: publicPath + '/#/Text' },
          ],
        }],
      }],
    },
  ]

  toggleTheme (theme: 'light' | 'dark') {
    const _theme: IPartialTheme = {
      palette: {},
    }
    if (theme === 'light') {
      _theme.palette = {
        themePrimary: '#0078d4',
        themeLighterAlt: '#eff6fc',
        themeLighter: '#deecf9',
        themeLight: '#c7e0f4',
        themeTertiary: '#71afe5',
        themeSecondary: '#2b88d8',
        themeDarkAlt: '#106ebe',
        themeDark: '#005a9e',
        themeDarker: '#004578',
        neutralLighterAlt: '#faf9f8',
        neutralLighter: '#f3f2f1',
        neutralLight: '#edebe9',
        neutralQuaternaryAlt: '#e1dfdd',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c6c4',
        neutralTertiary: '#a19f9d',
        neutralSecondary: '#605e5c',
        neutralPrimaryAlt: '#3b3a39',
        neutralPrimary: '#323130',
        neutralDark: '#201f1e',
        black: '#000000',
        white: '#ffffff',
      }
    } else {
      _theme.palette = {
        themePrimary: '#fadfad',
        themeLighterAlt: '#fae2b5',
        themeLighter: '#fbe6be',
        themeLight: '#fce9c7',
        themeTertiary: '#fcedd0',
        themeSecondary: '#fdf0d9',
        themeDarkAlt: '#fdf4e3',
        themeDark: '#fef7ec',
        themeDarker: '#fefbf5',
        neutralLighterAlt: '#3c3b39',
        neutralLighter: '#444241',
        neutralLight: '#514f4e',
        neutralQuaternaryAlt: '#595756',
        neutralQuaternary: '#5f5e5c',
        neutralTertiaryAlt: '#7a7977',
        neutralTertiary: '#c8c8c8',
        neutralSecondary: '#d0d0d0',
        neutralPrimaryAlt: '#dadada',
        neutralPrimary: '#fff',
        neutralDark: '#f4f4f4',
        black: '#f8f8f8',
        white: '#323130',
      }
    }
    this.theme = loadTheme(_theme)
  }
}
</script>

<style lang="scss">
body {
  margin: 0;
}
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  color: var(--fabric-bodyText);
}
.topNav {
  display: flex;
  padding: 10px;
  background: var(--fabric-neutralLighter);
  align-items: center;
  justify-content: flex-end;
  z-index: 1;
}
.page {
  background: var(--fabric-neutralLighter);
  display: flex;
  position: relative;
  flex: 1;
  overflow: auto;
}
.sidebar {
  background: var(--fabric-bodyBackground);
  width: 300px;
  margin-right: 10px;
  overflow-y: scroll;

  & > nav {
    flex: 1;
  }
}
.content {
  flex: 1;
  padding-left: 40px;
  padding-right: 40px;
  overflow: auto;
}
.content--inner {
  background: var(--fabric-bodyBackground);
  padding: 28px;
  margin: 20px 0;
}
</style>

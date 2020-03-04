<template>
  <div>
    <h1>Office UI Fabric Vue</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Getting Started</h2>

      Import and install the Vue Plugin to start using Office UI Fabric Vue:
      <pre>
import Fabric, { IOptions, IPartialTheme } from '@uifabric-vue/office-ui-fabric-vue'
Vue.use(Fabric, {} as IPartialTheme, {} as IOptions)
      </pre>

      <p>
        Importing the Typescript-interfaces is optional, but provides you with better intellisense. You can now use
        Office UI Fabric Vue everywhere by for example using <code>&lt;f-toggle /&gt;</code>. The prefix <code>f-</code>
        can be overridden using the Vue Plugin options.
      </p>

      Or you can import only the components you need for local registration:
      <pre>
import { Icon, Toggle } from '@uifabric-vue/office-ui-fabric-vue'
      </pre>

      <h3>Icons</h3>
      To use Fabric icons, you first must initialize them. You can use the official <code>@uifabric/icons</code> package
      to do so:
      <pre>
import { initializeIcons } from '@uifabric/icons'
initializeIcons()
      </pre>

      Office UI Fabric Vue also exports this function:
      <pre>
import { initializeIcons } from '@uifabric-vue/office-ui-fabric-vue'
initializeIcons()
      </pre>

      <h3>CSS Variables</h3>
      Office UI Fabric Vue can be configured to use CSS Variables for the color palette, which makes it very easy to
      change colors on the fly directly in the browser. Pass the <code>useCSSVars</code> to the Vue Plugin options to
      enable CSS Vars. This will generate the following css:

      <pre>
:root {
    --fabric-bodyBackground: #fff;
    --fabric-bodyBackgroundHovered: #f3f2f1;
    --fabric-bodyBackgroundChecked: #edebe9;
    --fabric-bodyStandoutBackground: #faf9f8;
    --fabric-bodyFrameBackground: #fff;
    /* ... */
}
      </pre>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class Welcome extends Vue {

}
</script>

<style lang="scss" scoped>
</style>

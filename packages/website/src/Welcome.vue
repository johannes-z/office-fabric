<template>
  <div>
    <h1>Office UI Fabric Vue</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Installation</h2>

      First you have to install some packages using your favorite package manager. Here we're using <code>yarn</code>,
      but you can also use any other package manager:

      <pre v-highlightjs><code class="shell">
yarn add @uifabric-vue/office-ui-fabric-vue
      </code></pre>

      That's it! If you're also planning on overriding CSS and add your own styling, you may also want to use the
      following packages. They are already <code>dependencies</code> of <code>@uifabric-vue/office-ui-fabric-vue</code>,
      but you should also specify that your project relies on those packages.

      <pre v-highlightjs><code class="shell">
yarn add @uifabric/merge-styles
yarn add @uifabric/styling
      </code></pre>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Getting Started</h2>

      Import the Vue Plugin to start using Office UI Fabric Vue:
      <pre v-highlightjs><code class="typescript">
import Fabric, { IOptions, IPartialTheme } from '@uifabric-vue/office-ui-fabric-vue'
Vue.use(Fabric, {} as IPartialTheme, {} as IOptions)
      </code></pre>

      <p>
        Importing the Typescript-interfaces is optional, but provides you with better intellisense. You can now use
        Office UI Fabric Vue everywhere by for example using <code>&lt;f-toggle /&gt;</code>. The prefix <code>f-</code>
        can be overridden using the Vue Plugin options.
      </p>

      Or you can import only the components you need for local registration:

      <pre v-highlightjs><code class="typescript">
import { Icon, Toggle } from '@uifabric-vue/office-ui-fabric-vue'
      </code></pre>

      <h3>Icons</h3>
      To use Fabric icons, you first must initialize them. You can use the official <code>@uifabric/icons</code> package
      to do so:

      <pre v-highlightjs><code class="typescript">
import { initializeIcons } from '@uifabric/icons'
initializeIcons()
      </code></pre>

      Office UI Fabric Vue also exports this function:
      <pre v-highlightjs><code class="typescript">
import { initializeIcons } from '@uifabric-vue/office-ui-fabric-vue'
initializeIcons()
      </code></pre>

      <h3>CSS Variables</h3>
      Office UI Fabric Vue can be configured to use CSS Variables for the color palette, which makes it very easy to
      change colors on the fly directly in the browser. Pass the <code>useCSSVars</code> to the Vue Plugin options to
      enable CSS Vars:

      <pre v-highlightjs><code class="css">
import Fabric, { IOptions, IPartialTheme } from '@uifabric-vue/office-ui-fabric-vue'

Vue.use(Fabric, {} as IPartialTheme, {
  useCSSVars: true,
} as IOptions)
      </code></pre>

      This will generate the following css:

      <CodeHighlight language="css">
        :root {
        --fabric-bodyBackground: #fff;
        --fabric-bodyBackgroundHovered: #f3f2f1;
        --fabric-bodyBackgroundChecked: #edebe9;
        --fabric-bodyStandoutBackground: #faf9f8;
        --fabric-bodyFrameBackground: #fff;
        /* ... */
        }
      </CodeHighlight>

      You can also check out the <a href="https://github.com/johannes-z/office-fabric/tree/master/packages/api-docs"
                                    target="_blank">api-docs</a>
      package to see an extensive usage of Office UI Fabric Vue.
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
pre {
  white-space: pre;
}
</style>

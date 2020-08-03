<script lang="tsx">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class IconPage extends Vue {
  render (h: CreateElement) {
    return h('DocPage', {
      props: {
        docs: {
          title: 'Icon',
          componentName: 'Icon',
          componentUrl: 'https://github.com/johannes-z/office-fabric/tree/master/packages/office-ui-fabric-vue/src/components/Icon',
          examples: [
            {
              title: 'Icon',
              code: require<any>('!raw-loader!./examples/Icon.Basic.Example.vue').default,
              view: () => import('./examples/Icon.Basic.Example.vue'),
            },
            {
              title: 'Icon with custom color',
              code: require<any>('!raw-loader!./examples/Icon.Color.Example.vue').default,
              view: () => import('./examples/Icon.Color.Example.vue'),
            },
            {
              title: 'Icon using custom svg',
              code: require<any>('!raw-loader!./examples/Icon.Svg.Example.vue').default,
              view: () => import('./examples/Icon.Svg.Example.vue'),
            },
            {
              title: 'Icon using image sheet',
              code: require<any>('!raw-loader!./examples/Icon.ImageSheet.Example.vue').default,
              view: () => import('./examples/Icon.ImageSheet.Example.vue'),
            },
          ],
          overview: require<string>('./docs/IconOverview.md'),
          bestPractices: '',
          dos: require<string>('./docs/IconDos.md'),
          donts: require<string>('./docs/IconDonts.md'),
          isHeaderVisible: true,
          implementation: {
            types: '',
            api: '',
          },
        },
      },
    })
  }
}
</script>

<style lang="scss" module>
</style>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

@Component
export default class SpinnerPage extends Vue {
  render (h: CreateElement) {
    return h('DocPage', {
      props: {
        docs: {
          title: 'Spinner',
          componentName: 'Spinner',
          componentUrl: 'https://github.com/johannes-z/office-fabric/tree/master/packages/office-ui-fabric-vue/src/components/Spinner',
          examples: [
            {
              title: 'Spinner sizes',
              code: require<any>('!raw-loader!@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/examples/Spinner.Basic.Example.vue').default,
              view: () => import('@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/examples/Spinner.Basic.Example.vue'),
            },
            {
              title: 'Spinner label positioning',
              code: require<any>('!raw-loader!@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/examples/Spinner.Labeled.Example.vue').default,
              view: () => import('@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/examples/Spinner.Labeled.Example.vue'),
            },
          ],
          overview: require<string>('@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/docs/SpinnerOverview.md'),
          bestPractices: '',
          dos: require<string>('@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/docs/SpinnerDos.md'),
          donts: require<string>('@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/docs/SpinnerDonts.md'),
          isHeaderVisible: true,
          implementation: {
            types: require<string>('api-docs/pages/Spinner.json'),
            api: require<string>('@uifabric-vue/office-ui-fabric-vue/src/components/Spinner/docs/SpinnerImplementation.md'),
          },
        },
      },
    })
  }
}
</script>

<style lang="scss" module>
</style>

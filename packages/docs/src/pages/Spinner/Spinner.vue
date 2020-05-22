<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CreateElement } from 'vue'

import api from 'api-docs/pages/Spinner.json'

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
              code: require<any>('!raw-loader!./examples/Spinner.Basic.Example.vue').default,
              view: () => import('./examples/Spinner.Basic.Example.vue'),
            },
            {
              title: 'Spinner label positioning',
              code: require<any>('!raw-loader!./examples/Spinner.Labeled.Example.vue').default,
              view: () => import('./examples/Spinner.Labeled.Example.vue'),
            },
          ],
          overview: require<string>('./docs/SpinnerOverview.md'),
          bestPractices: '',
          dos: require<string>('./docs/SpinnerDos.md'),
          donts: require<string>('./docs/SpinnerDonts.md'),
          isHeaderVisible: true,
          api: api,
        },
      },
    })
  }
}
</script>

<style lang="scss" module>
</style>

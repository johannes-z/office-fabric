<script setup lang="ts">
import { DefaultEffects } from '@fluentui-vue/style-utilities'
import { type PropType, type Ref, computed, defineAsyncComponent, ref, toRefs } from 'vue'
import DocSection from './DocSection.vue'
import ExampleCard from './ExampleCard.vue'

const props = defineProps({
  title: { type: String, default: '' },
  componentName: { type: String, default: '' },
  componentUrl: { type: String, default: '' },
  examples: { type: Array as PropType<any>, default: () => [] },
  overview: { type: Promise, default: undefined },
  bestPractices: { type: Promise, default: undefined },
  dos: { type: Promise, default: undefined },
  donts: { type: Promise, default: undefined },
})

function usePromiseRef<T>(promise?: Promise<T>) {
  const promiseRef = ref({
    resolved: false,
    value: null,
  }) as Ref<{ resolved: boolean; value: T | null }>
  if (!promise)
    return promiseRef

  promise.then((value) => {
    promiseRef.value.resolved = true
    promiseRef.value.value = value
  })

  return promiseRef
}

const {
  overview,
  bestPractices,
  dos,
  donts,
} = toRefs(props)

function toAsyncComponent<T>(prop: Ref<T>) {
  return {
    component: defineAsyncComponent(() => prop.value),
  }
}

const {
  component: overviewComponent,
} = toAsyncComponent(overview)
const {
  component: bestPracticesComponent,
} = toAsyncComponent(bestPractices)
const {
  component: dosComponent,
} = toAsyncComponent(dos)
const {
  component: dontsComponent,
} = toAsyncComponent(donts)
</script>

<template>
  <h1>{{ componentName }}</h1>
  <DocSection v-if="overview">
    <component :is="overviewComponent" />
  </DocSection>
  <DocSection v-if="bestPractices || (dos && donts)" title="Best practices">
    <component :is="bestPracticesComponent" />
    <div v-if="dos && donts" style="display: grid; grid-template-columns: 1fr 1fr;">
      <div>
        <h3>Do</h3>
        <div class="doList">
          <component :is="dosComponent" />
        </div>
      </div>
      <div>
        <h3>Don't</h3>
        <div class="dontList">
          <component :is="dontsComponent" />
        </div>
      </div>
    </div>
  </DocSection>
  <DocSection title="Usage">
    <ExampleCard v-for="(example, index) in examples" :key="index" :title="example.title">
      <component :is="example.view" />
      <pre>{{ example.code }}</pre>
    </ExampleCard>
  </DocSection>
</template>

<style>
.doList ul,
.dontList ul {
  padding-left: 24px;
}
.doList ul > li,
.dontList ul > li {
  font-size: 14px;
  list-style: none!important;
  margin-bottom: 20px;
  position: relative;
}
.doList ul > li:before {
  position: absolute;
  left: -24px;
  top: 1px;
  display: block;

  font-family: FabricMDL2Icons;

  content: "\e8fb";
  color: #107c10;
}
.dontList ul > li:before {
  position: absolute;
  left: -24px;
  top: 1px;
  display: block;

  font-family: FabricMDL2Icons;

  content: "\e711";
  color: #e81123;
}
</style>

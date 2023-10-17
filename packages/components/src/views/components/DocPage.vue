<script setup lang="ts">
import { type PropType, type Ref, defineAsyncComponent, ref, toRefs } from 'vue'
import DocSection from './DocSection.vue'
import ExampleCard from './ExampleCard.vue'

const props = defineProps({
  title: { type: String, default: '' },
  componentName: { type: String, default: '' },
  componentUrl: { type: String, default: '' },
  examples: { type: Array as PropType<any>, default: () => [] },
  overview: { type: Function, default: undefined },
  bestPractices: { type: Function, default: undefined },
  dos: { type: Function, default: undefined },
  donts: { type: Function, default: undefined },
})

const {
  overview,
  bestPractices,
  dos,
  donts,
} = toRefs(props)

function toAsyncComponent(prop: any) {
  if (!prop.value) {
    return {
      component: null,
    }
  }
  return {
    component: defineAsyncComponent(prop.value as any),
  }
}

const {
  component: overviewComponent,
} = toAsyncComponent(overview!)
const {
  component: bestPracticesComponent,
} = toAsyncComponent(bestPractices!)
const {
  component: dosComponent,
} = toAsyncComponent(dos!)
const {
  component: dontsComponent,
} = toAsyncComponent(donts!)
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
    <ExampleCard
      v-for="(example, index) in examples"
      :key="index"
      v-bind="example"
    />
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

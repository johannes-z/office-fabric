<script setup lang="ts">
import { Pivot, PivotItem } from '@fluentui-vue/components'
import { type PropType, computed, defineAsyncComponent, ref } from 'vue'
import CodeBlock from './CodeBlock.vue'

const props = defineProps({
  title: { type: String, default: '' },
  view: { type: [Object, Function] as PropType<any>, required: true },
  code: { type: [String, Function], default: '' },
})

const selectedKey = ref('view')

function onHandleLinkClicked(link) {
  selectedKey.value = link.itemKey
}

const component = computed(() => {
  return typeof props.view === 'function' ? defineAsyncComponent(props.view) : props.view
})
</script>

<template>
  <div class="ExampleCard">
    <div>
      <h3 v-if="title || code" class="ExampleCard-title">
        {{ title }}
        <Pivot
          v-if="code"
          headers-only
          :selected-key="selectedKey"
          :styles="{
            root: {
              'display': 'flex',
              'justify-content': 'flex-end',
            },
          }"
          @linkClick="onHandleLinkClicked"
        >
          <PivotItem header-text="Preview" item-icon="View" item-key="view" />
          <PivotItem header-text="Code" item-icon="Code" item-key="code" />
        </Pivot>
      </h3>
    </div>

    <component :is="component" v-if="selectedKey === 'view'" />
    <CodeBlock v-else-if="selectedKey === 'code'" :code="code" />
  </div>
</template>

<style lang="scss">
.ExampleCard ~ .ExampleCard {
  margin-top: 2rem;
}
.ExampleCard-title {
  font-size: 20px;
  font-weight: 600;
  color: #605e5c;

  border-bottom: 1px solid var(--fluentui-neutralSecondary);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

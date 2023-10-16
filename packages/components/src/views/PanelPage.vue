<script setup lang="ts">
import { hiddenContentStyle } from '@fluentui-vue/style-utilities'
import { getId } from '@fluentui-vue/utilities'
import { useId } from '@fluentui-vue/hooks'
import { mergeStyles } from '@fluentui/merge-styles'
import { computed, ref, watch } from 'vue'
import { DefaultButton, Panel } from '../components'
import DocSection from './components/DocSection.vue'
import type { IButton } from '@/components/Button/Button.types'

const hidePanel = ref(true)

function toggleHidePanel() {
  console.log(hidePanel.value)
  hidePanel.value = !hidePanel.value
}

const panelProps = computed(() => ({
  headerText: 'Sample panel',
  isOpen: hidePanel.value,
  onDismiss: toggleHidePanel,
  closeButtonAriaLabel: 'Close',
}))

const componentRef = ref<IButton | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})
</script>

<template>
  <h1>Panel</h1>
  <DocSection>
    <DefaultButton secondary-text="Opens the Sample Panel" text="Open Panel" @click="toggleHidePanel" />
    <label :id="labelId" :className="screenReaderOnly">
      My sample label
    </label>
    <label :id="subTextId" :className="screenReaderOnly">
      My sample description
    </label>

    <Panel
      :is-open="!hidePanel"
      headerText="Sample panel"
      has-close-button
      is-light-dismiss
      is-blocking
      :type="7"
      custom-width="900px"
      @dismiss="toggleHidePanel"
    >
      Some content in the Panel
    </Panel>
  </DocSection>
</template>

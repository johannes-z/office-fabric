<script setup lang="ts">
import { hiddenContentStyle, ScreenWidthMinMedium } from '@fluentui-vue/style-utilities'
import { getId } from '@fluentui-vue/utilities'
import { useId } from '@fluentui-vue/hooks'
import { mergeStyles } from '@fluentui/merge-styles'
import { computed, ref, watch } from 'vue'
import { ContextualMenu, DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Toggle } from '../components'
import DocSection from './components/DocSection.vue'
import type { IButton } from '@/components/Button/Button.types'

const dialogStyles = { main: {           
  width: 540, 
  minWidth: 'none', 
  selectors: { 
    [`@media (min-width: ${ScreenWidthMinMedium}px)`]: { width: 540 } 
  }
}}

const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
}
const screenReaderOnly = mergeStyles(hiddenContentStyle)
const dialogContentProps = {
  type: DialogType.close,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
}

const hideDialog = ref(true)
const isDraggable = ref(true)
const isBlocking = ref(true)
const isDarkOverlay = ref(false)
const isModeless = ref(false)
const labelId = getId('dialogLabel')
const subTextId = getId('subTextLabel')

function toggleHideDialog() {
  console.log(hideDialog.value)
  hideDialog.value = !hideDialog.value
}

const modalProps = computed(() => ({
  titleAriaId: labelId,
  subtitleAriaId: subTextId,
  isBlocking: isBlocking.value,
  isDarkOverlay: isDarkOverlay.value,
  isModeless: isModeless.value,
  styles: dialogStyles,
  dragOptions: isDraggable.value ? dragOptions : undefined,
}))

const componentRef = ref<IButton | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})
</script>

<template>
  <h1>Dialog</h1>
  <DocSection>
    <Toggle label="Is draggable" v-model="isDraggable" />
    <Toggle label="Is blocking" v-model="isBlocking" />
    <Toggle label="Is darkoverlay" v-model="isDarkOverlay" />
    <Toggle label="Is modeless" v-model="isModeless" />
    <DefaultButton secondary-text="Opens the Sample Dialog" text="Open Dialog" @click="toggleHideDialog" />
    <label :id="labelId" :className="screenReaderOnly">
      My sample label
    </label>
    <label :id="subTextId" :className="screenReaderOnly">
      My sample description
    </label>

    
    isDragable: {{ isDraggable }}
    isBlocking: {{ isBlocking }}
    isDarkOverlay: {{ isDarkOverlay }}
    isDarkOverlay: {{ isModeless }}

    <Dialog
      :hidden="hideDialog"
      :dialog-content-props="dialogContentProps"
      :modal-props="modalProps"
      @dismiss="toggleHideDialog"
    >
      <DialogFooter>
        <PrimaryButton text="Send" @click="toggleHideDialog" />
        <DefaultButton ref="componentRef" text="Don't send" @click="toggleHideDialog" />
      </DialogFooter>
    </Dialog>
  </DocSection>
</template>

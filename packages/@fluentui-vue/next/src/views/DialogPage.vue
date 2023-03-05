<script setup lang="ts">
import { hiddenContentStyle } from '@fluentui-vue/style-utilities'
import { getId } from '@fluentui-vue/utilities'
import { useId } from '@fluentui-vue/hooks'
import { mergeStyles } from '@fluentui/merge-styles'
import { ref } from 'vue'
import { ContextualMenu, DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton, Toggle } from '../components'
import DocumentCard from './components/DocumentCard.vue'

const dialogStyles = { main: { maxWidth: 450 } }
const dragOptions = {
  moveMenuItemText: 'Move',
  closeMenuItemText: 'Close',
  menu: ContextualMenu,
  keepInBounds: true,
}
const screenReaderOnly = mergeStyles(hiddenContentStyle)
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Missing Subject',
  closeButtonAriaLabel: 'Close',
  subText: 'Do you want to send this message without a subject?',
}

const hideDialog = ref(true)
const isDraggable = ref(true)
const labelId = getId('dialogLabel')
const subTextId = getId('subTextLabel')

const toggleHideDialog = () => {
  console.log(hideDialog.value)
  hideDialog.value = !hideDialog.value
}
const toggleIsDraggable = () => isDraggable.value = !isDraggable.value

const modalProps = ({
  titleAriaId: labelId,
  subtitleAriaId: subTextId,
  isBlocking: false,
  styles: dialogStyles,
  dragOptions: isDraggable.value ? dragOptions : undefined,
})
</script>

<template>
  <h1>Dialog</h1>
  <DocumentCard>
    <Toggle label="Is draggable" :checked="isDraggable" @change="toggleIsDraggable" />
    <DefaultButton secondary-text="Opens the Sample Dialog" text="Open Dialog" @click="toggleHideDialog" />
    <label :id="labelId" :className="screenReaderOnly">
      My sample label
    </label>
    <label :id="subTextId" :className="screenReaderOnly">
      My sample description
    </label>

    <Dialog
      :hidden="hideDialog"
      :dialog-content-props="dialogContentProps"
      :modal-props="modalProps"
      @dismiss="toggleHideDialog"
    >
      <DialogFooter>
        <PrimaryButton text="Send" @click="toggleHideDialog" />
        <DefaultButton text="Don't send" @click="toggleHideDialog" />
      </DialogFooter>
    </Dialog>
  </DocumentCard>
</template>

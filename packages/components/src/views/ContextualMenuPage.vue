<script setup lang="ts">
import { ref, type VNodeRef, watch } from 'vue'
import { ActionButton, ContextualMenu } from '../components'
import DocSection from './components/DocSection.vue'
import type { IButton } from '@/components/Button/Button.types'
import type { IContextualMenuItem } from '@/components/ContextualMenu'
import { ContextualMenuItemType } from '@/components/ContextualMenu'

const linkRef = ref(null)
const showContextualMenu = ref(false)
const contextMenuTarget = ref<VNodeRef|Event>()

const onShowContextualMenu = () => {
  contextMenuTarget.value = componentRef.value
  showContextualMenu.value = true
}
const onHideContextualMenu = () => showContextualMenu.value = false
const onRightClickContextMenu = (ev: MouseEvent) => {
  ev.preventDefault()
  contextMenuTarget.value = ev
  showContextualMenu.value = true
}

const menuItems: IContextualMenuItem[] = [
  {
    key: 'newItem',
    text: 'New',
    onClick: () => console.log('New clicked'),
  },
  {
    key: 'divider_1',
    itemType: ContextualMenuItemType.Divider,
  },
  {
    key: 'rename',
    text: 'Rename',
    onClick: () => console.log('Rename clicked'),
  },
  {
    key: 'edit',
    text: 'Edit',
    onClick: () => console.log('Edit clicked'),
  },
  {
    key: 'properties',
    text: 'Properties',
    onClick: () => console.log('Properties clicked'),
  },
  {
    key: 'linkNoTarget',
    text: 'Link same window',
    href: 'http://bing.com',
  },
  {
    key: 'linkWithTarget',
    text: 'Link new window',
    href: 'http://bing.com',
    target: '_blank',
  },
  {
    key: 'linkWithOnClick',
    name: 'Link click',
    href: 'http://bing.com',
    onClick: (ev: any) => {
      alert('Link clicked')
      ev.preventDefault()
    },
    target: '_blank',
  },
  {
    key: 'disabled',
    text: 'Disabled item',
    disabled: true,
    onClick: () => console.error('Disabled item should not be clickable.'),
  },
]

const componentRef = ref<IButton | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})
</script>

<template>
  <h1>ContextualMenu</h1>
  <DocSection>
    <h2>Basic ContextualMenu</h2>
    <div @contextmenu="onRightClickContextMenu">
      <p>
        This example directly uses ContextualMenu to show how it can be attached to arbitrary elements. The remaining
        examples use ContextualMenu through Fluent UI Button components.
      </p>
      <p>
        <b>
          <a ref="linkRef" href="#" @click.prevent="onShowContextualMenu">
            Click for ContextualMenu
          </a>
        </b>
      </p>
      <ActionButton ref="componentRef" :icon-props="{ iconName: 'More' }" @click="onShowContextualMenu">
        test
      </ActionButton>

      <ContextualMenu
        v-if="showContextualMenu"
        :items="menuItems"
        :target="contextMenuTarget"
        @itemClick="onHideContextualMenu"
        @dismiss="onHideContextualMenu"
      />
    </div>
  </DocSection>
</template>

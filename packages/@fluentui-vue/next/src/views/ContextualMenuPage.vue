<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { Ref, ref } from 'vue'
import { ContextualMenu } from '../components'
import DocumentCard from './components/DocumentCard.vue'
import { ContextualMenuItemType } from '@/components/ContextualMenu'
import type { IContextualMenuItem } from '@/components/ContextualMenu'

const linkRef = ref(null)
const showContextualMenu = ref(false)

const onShowContextualMenu = () => showContextualMenu.value = true
const onHideContextualMenu = () => showContextualMenu.value = false

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
</script>

<template>
  <h1>ContextualMenu</h1>
  <DocumentCard>
    <h2>Basic ContextualMenu</h2>
    <div>
      <p>
        This example directly uses ContextualMenu to show how it can be attached to arbitrary elements. The remaining
        examples use ContextualMenu through Fluent UI Button components.
      </p>
      <p>
        <b>
          <a ref="linkRef" href="#" @click="onShowContextualMenu">
            Click for ContextualMenu
          </a>
        </b>
      </p>
      <ContextualMenu
        :items="menuItems"
        :hidden="!showContextualMenu"
        :target="linkRef"
        @itemClick="onHideContextualMenu"
        @dismiss="onHideContextualMenu"
      />
    </div>
  </DocumentCard>
</template>

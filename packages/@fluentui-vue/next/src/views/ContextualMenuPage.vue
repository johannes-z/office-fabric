<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { Ref, ref } from 'vue'
import { CommandBarButton, ContextualMenu } from '../components'
import DocSection from './components/DocSection.vue'
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

const test = ref(null)
const buttonRef = ref(null)
function onRef(ref) {
  console.log(ref)
  console.log(test)
  buttonRef.value = ref
}
</script>

<template>
  <h1>ContextualMenu</h1>
  <DocSection>
    <h2>Basic ContextualMenu</h2>
    <div>
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
      <CommandBarButton ref="test" :component-ref="onRef" @click="onShowContextualMenu">
        test
      </CommandBarButton>
      <ContextualMenu
        v-if="showContextualMenu"
        :items="menuItems"
        :target="buttonRef.$el"
        @itemClick="onHideContextualMenu"
        @dismiss="onHideContextualMenu"
      />
    </div>
  </DocSection>
</template>

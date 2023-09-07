<script setup lang="ts">
import { ref, watch } from 'vue'
import type { IIconProps } from '../components'
import { ActionButton, CommandBarButton, CompoundButton, DefaultButton, IconButton, PrimaryButton, Stack, Toggle } from '../components'
import DocSection from './components/DocSection.vue'
import type { IStackTokens } from '@/components/Stack'
import type { IContextualMenuProps } from '@/components/ContextualMenu'
import type { IButton } from '@/components/Button/Button.types'

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' },
      onClick: () => {
        console.log('Mail')
      },
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
      onClick: () => {
        console.log('Calendar')
      },
    },
  ],
}
const addIcon: IIconProps = { iconName: 'Add' }
const mailIcon: IIconProps = { iconName: 'Mail' }
const stackTokens: IStackTokens = { childrenGap: 40 }

const checked = ref(false)
const disabled = ref(false)

const componentRef = ref<IButton | null>(null)
watch(componentRef, () => {
  console.log(componentRef.value)
  componentRef.value?.focus()
})
</script>

<template>
  <h1>Button</h1>

  <DocSection>
    <h2>Usage</h2>

    <Toggle v-model="checked" label="Mark as checked" inline-label />
    <Toggle v-model="disabled" label="Disable buttons" inline-label />

    <h3>Default Button</h3>
    <Stack horizontal :tokens="stackTokens">
      <DefaultButton ref="componentRef" :disabled="disabled" :checked="checked">
        Standard
      </DefaultButton>
      <DefaultButton :disabled="disabled" :checked="checked" primary>
        Primary
      </DefaultButton>
    </Stack>

    <h3>Primary Button</h3>
    <PrimaryButton :disabled="disabled" :checked="checked">
      Primary Button
    </PrimaryButton>

    <h3>Compound Button</h3>
    <CompoundButton :disabled="disabled" :checked="checked" secondary-text="This is the secondary text.">
      Standard
    </CompoundButton>
    <CompoundButton :disabled="disabled" :checked="checked" primary secondary-text="This is the secondary text.">
      Primary
    </CompoundButton>

    <h3>IconButton</h3>
    <IconButton :disabled="disabled" :checked="checked" :icon-props="{ iconName: 'Emoji2' }" title="Emoji" aria-label="Emoji" />

    <h3>ActionButton</h3>
    <ActionButton :disabled="disabled" :checked="checked" :icon-props="{ iconName: 'AddFriend' }" allow-disabled-focus>
      Create account
    </ActionButton>

    <h3>Command Bar Button</h3>
    <div style="display: flex; height: 44px;">
      <CommandBarButton
        :icon-props="addIcon"
        text="New item"
        :menu-props="menuProps"
        :disabled="disabled"
        :checked="checked"
      />
      <CommandBarButton :icon-props="mailIcon" text="Send mail" :disabled="disabled" :checked="checked" />
    </div>
  </DocSection>
</template>

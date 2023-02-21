<script setup lang="ts">
import type { IIconProps } from '../components'
import { ActionButton, CommandBarButton, CompoundButton, DefaultButton, IconButton } from '../components'
import type { IContextualMenuProps } from '@/components/ContextualMenu'
import type { IStackStyles } from '@/components/Stack'

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
const stackStyles: Partial<IStackStyles> = { root: { height: 44 } }
</script>

<template>
  <h1>Button</h1>

  <h2>Default Button</h2>
  <DefaultButton>Standard</DefaultButton>
  <DefaultButton primary>
    Primary
  </DefaultButton>
  <DefaultButton disabled>
    Standard
  </DefaultButton>
  <DefaultButton disabled primary>
    Primary
  </DefaultButton>
  <DefaultButton checked>
    Standard
  </DefaultButton>
  <DefaultButton checked primary>
    Primary
  </DefaultButton>

  <h2>Compound Button</h2>
  <CompoundButton secondary-text="This is the secondary text.">
    Standard
  </CompoundButton>
  <CompoundButton primary secondary-text="This is the secondary text.">
    Primary
  </CompoundButton>
  <CompoundButton disabled secondary-text="This is the secondary text.">
    Standard
  </CompoundButton>
  <CompoundButton disabled primary secondary-text="This is the secondary text.">
    Primary
  </CompoundButton>
  <CompoundButton checked secondary-text="This is the secondary text.">
    Standard
  </CompoundButton>
  <CompoundButton checked primary secondary-text="This is the secondary text.">
    Primary
  </CompoundButton>

  <h2>IconButton</h2>
  <IconButton :icon-props="{ iconName: 'Emoji2' }" title="Emoji" aria-label="Emoji" />
  <IconButton disabled :icon-props="{ iconName: 'Emoji2' }" title="Emoji" aria-label="Emoji" />
  <IconButton checked :icon-props="{ iconName: 'Emoji2' }" title="Emoji" aria-label="Emoji" />

  <h2>ActionButton</h2>
  <ActionButton :icon-props="{ iconName: 'AddFriend' }" allow-disabled-focus>
    Create account
  </ActionButton>
  <ActionButton disabled :icon-props="{ iconName: 'AddFriend' }" allow-disabled-focus>
    Create account
  </ActionButton>
  <ActionButton checked :icon-props="{ iconName: 'AddFriend' }" allow-disabled-focus>
    Create account
  </ActionButton>

  <h2>Command Bar Button</h2>
  <div style="display: flex; height: 44px;">
    <CommandBarButton
      :icon-props="addIcon"
      text="New item"
      :menu-props="menuProps"
    />
    <CommandBarButton :icon-props="mailIcon" text="Send mail" />
  </div>
</template>

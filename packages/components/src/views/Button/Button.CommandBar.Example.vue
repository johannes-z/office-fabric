<script setup lang="ts">
import { CommandBarButton, type IContextualMenuProps, type IIconProps, type IStackStyles, Stack } from '@fluentui-vue/components'

// These are set based on the toggles shown above the examples (not needed in real code)
defineProps({
  checked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

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
  <Stack horizontal :styles="stackStyles">
    <CommandBarButton
      :icon-props="addIcon"
      text="New item"
      :menu-props="menuProps"
      :disabled="disabled"
      :checked="checked"
    />
    <CommandBarButton :icon-props="mailIcon" text="Send mail" :disabled="disabled" :checked="checked" />
  </Stack>
</template>

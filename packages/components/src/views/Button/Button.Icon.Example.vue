<script setup lang="ts">
import { type IContextualMenuProps, type IIconProps, type IStackStyles, IconButton, Link, Stack } from '@fluentui-vue/components'

// These are set based on the toggles shown above the examples (not needed in real code)
defineProps({
  checked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emojiIcon: IIconProps = { iconName: 'Emoji2' }

const menuProps: IContextualMenuProps = {
  items: [
    {
      key: 'emailMessage',
      text: 'Email message',
      iconProps: { iconName: 'Mail' },
    },
    {
      key: 'calendarEvent',
      text: 'Calendar event',
      iconProps: { iconName: 'Calendar' },
    },
  ],
  directionalHintFixed: true,
}

const stackStyles: Partial<IStackStyles> = { root: { height: 44 } }
</script>

<template>
  <Stack horizontal :styles="stackStyles">
    <IconButton :disabled="disabled" :checked="checked" :icon-props="emojiIcon" title="Emoji" aria-label="Emoji" />
    <IconButton :disabled="disabled" :checked="checked" :icon-props="emojiIcon" :menu-props="menuProps" title="Emoji" aria-label="Emoji" />
  </Stack>
  <p>
    For a list of Icons, visit our
    <Link href="https://developer.microsoft.com/en-us/fluentui#/styles/icons" underline>
      Icon documentation
    </Link>
    .
  </p>
</template>

<script setup lang="ts">
import { ActionButton, type IIconProps } from '@fluentui-vue/components'

// These are set based on the toggles shown above the examples (not needed in real code)
defineProps({
  checked: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const addFriendIcon: IIconProps = { iconName: 'AddFriend' }
</script>

<template>
  <ActionButton :disabled="disabled" :checked="checked" :icon-props="addFriendIcon" allow-disabled-focus>
    Create account
  </ActionButton>
</template>

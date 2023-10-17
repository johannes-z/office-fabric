<script setup lang="ts">
import { hiddenContentStyle } from '@fluentui-vue/style-utilities'
import { getId } from '@fluentui-vue/utilities'
import { useId } from '@fluentui-vue/hooks'
import { mergeStyles } from '@fluentui/merge-styles'
import { computed, ref, watch } from 'vue'
import { DefaultButton, Tooltip, TooltipHost } from '../components'
import DocSection from './components/DocSection.vue'
import type { IButton } from '@/components/Button/Button.types'
import type { ITooltipHostStyles } from '@/components/Tooltip/TooltipHost.styles'
import type { ICalloutProps } from '@/components/Callout/Callout.types'

const tooltipId = getId('tooltip')
const tooltipStyles: Partial<ITooltipHostStyles> = {
  root: { display: 'inline-block' },
}
const calloutProps: Partial<ICalloutProps> = {
  gapSpace: 0,
}
</script>

<template>
  <h1>Tooltip</h1>
  <DocSection>
    Sample Tooltip
    <TooltipHost
      :id="tooltipId"
      content="This is the tooltip content"
      :callout-props="calloutProps"
      :styles="tooltipStyles"
    >
      <DefaultButton text="Hover me" :aria-describedby="tooltipId" />
    </TooltipHost>
  </DocSection>
</template>

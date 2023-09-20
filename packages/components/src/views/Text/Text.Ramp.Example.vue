<script setup lang="ts">
import { Text } from '@fluentui-vue/components'

const testText = 'The quick brown fox jumped over the lazy dog.'

const variants = [
  { name: 'tiny' },
  { name: 'xSmall' },
  { name: 'small' },
  { name: 'smallPlus' },
  { name: 'medium' },
  { name: 'mediumPlus' },
  { name: 'large' },
  { name: 'xLarge' },
  { name: 'xxLarge' },
  { name: 'mega' },
]
</script>

<template>
  <div style="overflow: auto;">
    <table>
      <tbody>
        <tr v-for="(variant) in variants" :key="variant.name">
          <td>{{ variant.name }}</td>
          <td>
            <Text :variant="variant.name" nowrap>
              {{ testText }}
            </Text>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

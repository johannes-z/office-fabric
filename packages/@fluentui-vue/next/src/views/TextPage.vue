<script setup lang="ts">
import { useId } from '@fluentui-vue/vue-hooks'
import { ref } from 'vue'
import { Text } from '../components'
import DocumentCard from './components/DocumentCard.vue'
import { TextField } from '@/components/TextField'

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
  <h1>Text</h1>

  <DocumentCard>
    <h2>Usage</h2>

    <h3>Text Ramp Example</h3>
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
  </DocumentCard>
</template>

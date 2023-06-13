<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { ref } from 'vue'
import { Stack, Text } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'
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

const tokens = {
  sectionStack: {
    childrenGap: 10,
  },
  headingStack: {
    childrenGap: 5,
  },
}
</script>

<template>
  <h1>Text</h1>

  <DocSection title="Usage">
    <ExampleCard title="Text Ramp Example">
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
    </ExampleCard>
    <ExampleCard title="Text Wrap Example">
      <Stack :tokens="tokens.sectionStack">
        <Stack :tokens="tokens.headingStack">
          <Text variant="large" block>
            Wrap (Default)
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </Text>
        </Stack>
        <Stack :tokens="tokens.headingStack">
          <Text variant="large" block>
            No Wrap
          </Text>
          <Text nowrap>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </Text>
        </Stack>
      </Stack>
    </ExampleCard>
    <ExampleCard title="Text Block Example">
      <Text block>
        I am block text.
      </Text>
      <Text block>
        Since block is specified,
      </Text>
      <Text block>
        every block of text
      </Text>
      <Text block>
        gets its own line.
      </Text>
    </ExampleCard>
  </DocSection>
</template>

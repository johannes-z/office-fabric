<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { FontWeights } from '@fluentui-vue/theme'
import { Callout, DefaultButton, Link, Text } from '../components'

const calloutRef = ref(null)

const buttonId = 'callout-button'
const labelId = 'callout-label'
const descriptionId = 'callout-description'

const isCalloutVisible = ref(false)
function toggle() {
  isCalloutVisible.value = !isCalloutVisible.value
  if (!isCalloutVisible.value)
    return
}

const styles = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    maxWidth: '90%',
    padding: '20px 24px',
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: 'block',
    marginTop: 20,
  },
})

function setEl(el) {
  console.log('CalloutPage > setEl')
  console.log(el)
}
</script>

<template>
  <h1>Callout</h1>
  <DefaultButton
    :id="buttonId"
    :text="isCalloutVisible ? 'Hide callout' : 'Show callout'"
    :class-name="styles.button"
    @click="toggle"
  />

  {{ isCalloutVisible }}

  <Callout
    v-if="isCalloutVisible"
    :ref="el => setEl(el)"
    :class-name="styles.callout"
    :aria-labelled-by="labelId"
    :aria-described-by="descriptionId"
    role="dialog"
    :gap-space="0"
    :target="`#${buttonId}`"
    set-initial-focus
    @dismiss="toggle"
  >
    <Text :id="labelId" as="h1" block variant="xLarge" :class-name="styles.title">
      Callout title here
    </Text>
    <Text :id="descriptionId" block variant="small">
      Message body is optional. If help documentation is available, consider adding a link to learn more at the
      bottom.
    </Text>
    <Link href="http://microsoft.com" target="_blank" :class-name="styles.link">
      Sample link
    </Link>
  </Callout>
</template>

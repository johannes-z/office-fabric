<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { Rating, RatingSize } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'

const textFieldId = useId('anInput')
</script>

<template>
  <h1>Rating</h1>

  <DocSection title="Usage">


      <Rating :size="RatingSize.Large" />
      <Rating :max="10" />

      <Rating disabled />
      <Rating :max="5" :rating="2.5" read-only />
      <Rating
        :max="5"
        :rating="2.5"
        icon="StarburstSolid"
        unselected-icon="Starburst"
      />
  </DocSection>
</template>

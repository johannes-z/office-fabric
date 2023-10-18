<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { Rating, RatingSize } from '@fluentui-vue/components'

const textFieldId = useId('anInput')
</script>

<template>
  <Rating :size="RatingSize.Large" />
  <Rating :max="10" />

  <Rating disabled />
  <Rating :max="5" :rating="2.5" read-only />
  <Rating
    :max="5"
    :default-rating="2.5"
    icon="StarburstSolid"
    unselected-icon="Starburst"
  />
</template>

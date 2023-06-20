<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { ref } from 'vue'
import { Calendar } from '../components'
import DocSection from './components/DocSection.vue'
import ExampleCard from './components/ExampleCard.vue'
import { defaultCalendarStrings } from '@/components/Calendar/defaults'

const selectedDate = ref(new Date())
</script>

<template>
  <h1>Calendar</h1>

  <DocSection title="Usage">
    <ExampleCard title="Calendar">
      <div style="height: 360px">
        <div>Selected date: {{ selectedDate?.toLocaleString() || 'Not set' }}</div>
        <Calendar show-go-to-today :value="selectedDate" :strings="defaultCalendarStrings" />
      </div>
    </ExampleCard>
  </DocSection>
</template>

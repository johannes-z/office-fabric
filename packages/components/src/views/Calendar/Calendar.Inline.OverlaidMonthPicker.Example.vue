<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, defaultCalendarStrings } from '@fluentui-vue/components'

const selectedDate = ref(new Date())
</script>

<template>
  <div style="height: 360px">
    <div>Selected date: {{ selectedDate?.toLocaleString() || 'Not set' }}</div>
    <Calendar
      v-model="selectedDate"
      show-month-picker-as-overlay
      highlight-selected-month
      :show-go-to-today="false"
      :strings="defaultCalendarStrings"
    />
  </div>
</template>

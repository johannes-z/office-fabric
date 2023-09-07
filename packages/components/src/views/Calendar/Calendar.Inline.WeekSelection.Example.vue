<script setup lang="ts">
import { ref } from 'vue'
import { Calendar, DateRangeType, DayOfWeek, defaultCalendarStrings } from '@fluentui-vue/components'

const selectedDate = ref(new Date())
const dateRangeType = DateRangeType.Week
const firstDayOfWeek = DayOfWeek.Sunday
</script>

<template>
  <div style="height: 360px">
    <div>Selected date: {{ selectedDate?.toLocaleString() || 'Not set' }}</div>
    <Calendar
      v-model="selectedDate"
      :date-range-type="dateRangeType"
      :first-day-of-week="firstDayOfWeek"
      highlight-selected-month
      show-go-to-today
      :strings="defaultCalendarStrings"
    />
  </div>
</template>

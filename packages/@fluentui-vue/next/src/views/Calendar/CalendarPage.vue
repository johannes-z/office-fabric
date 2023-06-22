<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import DocPage from '../components/DocPage.vue'
import CalendarInlineExample from './Calendar.Inline.Example.vue'
import CalendarInlineExampleCode from './Calendar.Inline.Example.vue?raw'

import CalendarInlineOverlaidMonthExample from './Calendar.Inline.OverlaidMonthPicker.Example.vue'
import CalendarInlineOverlaidMonthExampleCode from './Calendar.Inline.OverlaidMonthPicker.Example.vue?raw'

import CalendarInlineWeekSelectionExample from './Calendar.Inline.WeekSelection.Example.vue'
import CalendarInlineWeekSelectionExampleCode from './Calendar.Inline.WeekSelection.Example.vue?raw'

import CalendarInlineMonthSelectionExample from './Calendar.Inline.MonthSelection.Example.vue'
import CalendarInlineMonthSelectionExampleCode from './Calendar.Inline.MonthSelection.Example.vue?raw'

import DocSection from '@/views/components/DocSection.vue'
import ExampleCard from '@/views/components/ExampleCard.vue'
import { defaultCalendarStrings } from '@/components/Calendar/defaults'

const selectedDate5 = ref(new Date())
const selectedDate6 = ref(new Date())
const CalendarPageProps = {
  title: 'Calendar',
  componentName: 'Calendar',
  componentUrl: '',
  examples: [
    {
      title: 'Calendar',
      view: CalendarInlineExample,
      code: CalendarInlineExampleCode,
    },
    {
      title: 'Calendar with overlaid month picker when header is clicked',
      view: CalendarInlineOverlaidMonthExample,
      code: CalendarInlineOverlaidMonthExampleCode,
    },
    {
      title: 'Calendar with week selection',
      view: CalendarInlineWeekSelectionExample,
      code: CalendarInlineWeekSelectionExampleCode,
    },
    {
      title: 'Calendar with month selection',
      view: CalendarInlineMonthSelectionExample,
      code: CalendarInlineMonthSelectionExampleCode,
    },
  ],
  overview: defineAsyncComponent(() => import('./docs/CalendarOverview.md')),
  bestPractices: defineAsyncComponent(() => import('./docs/CalendarBestPractices.md')),
}
</script>

<template>
  <DocPage v-bind="CalendarPageProps" />

  <DocSection title="Usage">
    <ExampleCard title="Calendar with week numbers">
      <div style="height: 360px">
        <div>Selected date: {{ selectedDate5?.toLocaleString() || 'Not set' }}</div>
        <Calendar
          v-model="selectedDate5"
          show-week-numbers
          show-go-to-today
          :strings="defaultCalendarStrings"
        />
      </div>
    </ExampleCard>

    <ExampleCard title="Calendar displaying 6 weeks">
      <div style="height: 360px">
        <div>Selected date: {{ selectedDate6?.toLocaleString() || 'Not set' }}</div>
        <Calendar
          v-model="selectedDate6"
          show-six-weeks-by-default
          show-go-to-today
          :strings="defaultCalendarStrings"
        />
      </div>
    </ExampleCard>
  </DocSection>
</template>

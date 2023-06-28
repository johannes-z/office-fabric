<script setup lang="ts">
import DocPage from '../components/DocPage.vue'
import CalendarInlineExample from './Calendar.Inline.Example.vue'
import CalendarInlineExampleCode from './Calendar.Inline.Example.vue?raw'

import CalendarInlineOverlaidMonthExample from './Calendar.Inline.OverlaidMonthPicker.Example.vue'
import CalendarInlineOverlaidMonthExampleCode from './Calendar.Inline.OverlaidMonthPicker.Example.vue?raw'

import CalendarInlineWeekSelectionExample from './Calendar.Inline.WeekSelection.Example.vue'
import CalendarInlineWeekSelectionExampleCode from './Calendar.Inline.WeekSelection.Example.vue?raw'

import CalendarInlineMonthSelectionExample from './Calendar.Inline.MonthSelection.Example.vue'
import CalendarInlineMonthSelectionExampleCode from './Calendar.Inline.MonthSelection.Example.vue?raw'

import CalendarInlineWeekNumbersExample from './Calendar.Inline.WeekNumbers.Example.vue'
import CalendarInlineWeekNumbersExampleCode from './Calendar.Inline.WeekNumbers.Example.vue?raw'

import CalendarSixWeeksExample from './Calendar.Inline.SixWeeks.Example.vue'
import CalendarSixWeeksExampleCode from './Calendar.Inline.SixWeeks.Example.vue?raw'

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
    {
      title: 'Calendar with week numbers',
      view: CalendarInlineWeekNumbersExample,
      code: CalendarInlineWeekNumbersExampleCode,
    },
    {
      title: 'Calendar displaying 6 weeks',
      view: CalendarSixWeeksExample,
      code: CalendarSixWeeksExampleCode,
    },
  ],
  overview: import('./docs/CalendarOverview.md'),
  bestPractices: import('./docs/CalendarBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="CalendarPageProps" />
</template>

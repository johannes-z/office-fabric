<script setup lang="ts">
import DocPage from '../components/DocPage.vue'

const CalendarPageProps = {
  title: 'Calendar',
  componentName: 'Calendar',
  componentUrl: '',
  examples: [
    {
      title: 'Calendar',
      view: () => import('./Calendar.Inline.Example.vue'),
      code: () => import('./Calendar.Inline.Example.vue?raw'),
    },
    {
      title: 'Calendar with overlaid month picker when header is clicked',
      view: () => import('./Calendar.Inline.OverlaidMonthPicker.Example.vue'),
      code: () => import('./Calendar.Inline.OverlaidMonthPicker.Example.vue?raw'),
    },
    {
      title: 'Calendar with week selection',
      view: () => import('./Calendar.Inline.WeekSelection.Example.vue'),
      code: () => import('./Calendar.Inline.WeekSelection.Example.vue?raw'),
    },
    {
      title: 'Calendar with month selection',
      view: () => import('./Calendar.Inline.MonthSelection.Example.vue'),
      code: () => import('./Calendar.Inline.MonthSelection.Example.vue?raw'),
    },
    {
      title: 'Calendar with week numbers',
      view: () => import('./Calendar.Inline.WeekNumbers.Example.vue'),
      code: () => import('./Calendar.Inline.WeekNumbers.Example.vue?raw'),
    },
    {
      title: 'Calendar displaying 6 weeks',
      view: () => import('./Calendar.Inline.SixWeeks.Example.vue'),
      code: () => import('./Calendar.Inline.SixWeeks.Example.vue?raw'),
    },
  ],
  overview: () => import('./docs/CalendarOverview.md'),
  bestPractices: () => import('./docs/CalendarBestPractices.md'),
}
</script>

<template>
  <DocPage v-bind="CalendarPageProps" />
</template>

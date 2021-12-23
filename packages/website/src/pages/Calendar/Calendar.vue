<template>
  <div>
    <h1>Calendar</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Calendar</h2>
      <div>Selected date: {{ selectedDate ? selectedDate.toLocaleString() : 'Not set' }}</div>
      <Calendar v-model="selectedDate"
                show-go-to-today />

      <Calendar v-model="selectedDate"
                show-month-picker-as-overlay
                highlight-selected-month
                :show-go-to-today="false" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Calendar } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: {
    Calendar,
  },
})
export default class CalendarPage extends Vue {
  selectedDate = new Date()
}
</script>

<style lang="scss" module>
</style>

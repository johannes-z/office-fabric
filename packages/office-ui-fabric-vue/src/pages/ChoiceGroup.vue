<template>
  <div>
    <h1>ChoiceGroup</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default ChoiceGroup</h2>
      <o-choice-group label="Default ChoiceGroup" :options="options" />

      <h2>ChoiceGroup with a custom label</h2>
      <o-label required>Custom Label</o-label>
      <o-choice-group :options="options" />

      <h2>ChoiceGroups with images</h2>
      <o-choice-group label="Pick one image" :options="options" />

      <h2>ChoiceGroups with icons</h2>
      <o-choice-group label="Pick one icon" :options="iconOptions" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
  },
})
export default class ChoiceGroupPage extends Vue {
  options = [
    { key: 'A', text: 'Option A' },
    { key: 'B', text: 'Option B' },
    { key: 'C', text: 'Option C', disabled: true },
    { key: 'D', text: 'Option D' },
  ]
  iconOptions = [
    {
      key: 'day',
      iconProps: { iconName: 'CalendarDay' },
      text: 'Day',
    },
    {
      key: 'week',
      iconProps: { iconName: 'CalendarWeek' },
      text: 'Week',
    },
    {
      key: 'month',
      iconProps: { iconName: 'Calendar' },
      text: 'Month',
      disabled: true,
    },
  ]
}
</script>

<style lang="scss" module>
</style>

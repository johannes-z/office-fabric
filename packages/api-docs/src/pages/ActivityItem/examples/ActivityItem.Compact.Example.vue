<template>
  <div>
    <f-activity-item
      :class="classNames.exampleRoot"
      :activity-personas="[{ imageUrl: TestImages.personaFemale }]"
      is-compact>
      <template #activityDescription>
        <span :class="classNames.nameText">Tahlia Whittle</span> edited this file
      </template>
    </f-activity-item>

    <f-activity-item
      :class="classNames.exampleRoot"
      :activity-personas="[
        { imageInitials: 'PT', text: 'Robert Larsson' },
        { imageUrl: TestImages.personaMale },
        { imageInitials: 'EC', text: 'Eduarda Costa' }
      ]"
      is-compact>
      <template #activityDescription>
        <span :class="classNames.nameText">Patrick Loton</span> and <span :class="classNames.nameText">6 others</span>
      </template>
    </f-activity-item>

    <f-activity-item
      :class="classNames.exampleRoot"
      is-compact>
      <template #icon>
        <f-icon icon-name="Add" />
      </template>
      <template #activityDescription>
        <span :class="classNames.nameText">Sabrina De Luca</span> added this file
      </template>
    </f-activity-item>

    <f-activity-item
      :class="classNames.exampleRoot"
      is-compact>
      <template #icon>
        <f-icon icon-name="Share" />
      </template>
      <template #activityDescription>
        <span :class="classNames.nameText">Chuan Rojumanong</span> shared this file
      </template>
    </f-activity-item>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mergeStyleSets } from '@uifabric/styling'
import { TestImages } from '@uifabric/example-data'

@Component({
  components: {},
})
export default class ActivityItemCompactExample extends Vue {
  TestImages = TestImages

  classNames = mergeStyleSets({
    exampleRoot: {
      marginTop: '20px',
    },
    nameText: {
      fontWeight: 'bold',
    },
  });
}
</script>

<style lang="scss" scoped>
</style>

<template>
  <div>
    <f-activity-item
      :class="classNames.exampleRoot"
      :activity-personas="[{ imageUrl: TestImages.personaMale }]">
      <template #activityDescription>
        <f-link :class="classNames.nameText">Jack Howden</f-link> renamed
        <span :class="classNames.nameText">DocumentTitle.docx</span>
      </template>
      <template #comments>Hello, this is the text of my basic comment!</template>
      <template #timeStamp>23m ago</template>
    </f-activity-item>

    <f-activity-item
      :class="classNames.exampleRoot"
      :activity-personas="[{ imageInitials: 'JM', text: 'Javiera Márquez' }, { imageUrl: TestImages.personaFemale }]">
      <template #activityDescription>
        <f-link :class="classNames.nameText">Javiera Márquez</f-link> and
        <f-link :class="classNames.nameText">Amelia Povaliy</f-link> edited
        <f-link :class="classNames.nameText">SpreadsheetTitle.xlsx</f-link>
      </template>
      <template #timeStamp>9:27 am</template>
    </f-activity-item>

    <f-activity-item
      :class="classNames.exampleRoot"
      :activity-personas="[
        { imageInitials: 'RL', text: 'Robert Larsson' },
        { imageUrl: TestImages.personaMale },
        { imageUrl: TestImages.personaFemale }
      ]">
      <template #activityDescription>
        <f-link :class="classNames.nameText">Robert Larsson</f-link> and
        <f-link :class="classNames.nameText">2 others</f-link> commented
      </template>
      <template #timeStamp>3 days ago</template>
    </f-activity-item>

    <f-activity-item
      :class="classNames.exampleRoot"
      :activity-personas="[
        { imageInitials: 'JC', text: 'Jin Cheng' },
        { imageUrl: TestImages.personaMale },
        { imageInitials: 'AL', text: 'Annie Lindqvist' },
        { imageUrl: TestImages.personaFemale },
        { imageUrl: TestImages.personaMale },
        { imageUrl: TestImages.personaMale }
      ]">
      <template #activityDescription>
        <f-link :class="classNames.nameText">Jin Cheng</f-link> and
        <f-link :class="classNames.nameText">5 others</f-link> edited this file
      </template>
      <template #timeStamp>August 3, 2017</template>
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
export default class ActivityItemPersonaExample extends Vue {
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

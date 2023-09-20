<script setup lang="ts">
import { ActivityItem, Icon } from '@fluentui-vue/components'
import { mergeStyleSets } from '@fluentui/merge-styles'

const classNames = mergeStyleSets({
  exampleRoot: {
    marginTop: '20px',
  },
  nameText: {
    fontWeight: 'bold',
  },
})

const TestImages = {
  personaFemale: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/office-ui-fabric-react-assets/persona-female.png',
  personaMale: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/office-ui-fabric-react-assets/persona-male.png',
}
</script>

<template>
  <ActivityItem :class="classNames.exampleRoot" :activity-personas="[{ imageUrl: TestImages.personaFemale }]" is-compact>
    <template #description>
      <span :class="classNames.nameText">Tahlia Whittle</span> edited this file
    </template>
  </ActivityItem>

  <ActivityItem
    :class="classNames.exampleRoot" :activity-personas="[
      { imageInitials: 'PT', text: 'Robert Larsson' },
      { imageUrl: TestImages.personaMale },
      { imageInitials: 'EC', text: 'Eduarda Costa' },
    ]" is-compact
  >
    <template #description>
      <span :class="classNames.nameText">Patrick Loton</span> and 6 others
    </template>
  </ActivityItem>

  <ActivityItem :class="classNames.exampleRoot" is-compact>
    <template #description>
      <span :class="classNames.nameText">Sabrina De Luca</span> added this file
    </template>
    <template #icon>
      <Icon icon-name="Add" />
    </template>
  </ActivityItem>

  <ActivityItem :class="classNames.exampleRoot" is-compact>
    <template #description>
      <span :class="classNames.nameText">Chuan Rojumanong</span> shared this file
    </template>
    <template #icon>
      <Icon icon-name="Share" />
    </template>
  </ActivityItem>
</template>

<script setup lang="ts">
import { mergeStyleSets } from '@fluentui/merge-styles'
import { ActivityItem, Icon, Link } from '@fluentui-vue/components'

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

const activityPersonas = [{
  imageUrl: TestImages.personaMale,
}]

const activityPersonas2 = [
  { imageInitials: 'JM', text: 'Javiera Márquez' },
  { imageUrl: TestImages.personaFemale },
]

const activityPersonas3 = [
  { imageInitials: 'RL', text: 'Robert Larsson' },
  { imageUrl: TestImages.personaMale },
  { imageUrl: TestImages.personaFemale },
]

const activityPersonas4 = [
  { imageInitials: 'JC', text: 'Jin Cheng' },
  { imageUrl: TestImages.personaMale },
  { imageInitials: 'AL', text: 'Annie Lindqvist' },
  { imageUrl: TestImages.personaFemale },
  { imageUrl: TestImages.personaMale },
  { imageUrl: TestImages.personaMale },
]
</script>

<template>
  <ActivityItem :class="classNames.exampleRoot" :activity-personas="activityPersonas">
    <template #description>
      <Link :class="classNames.nameText">
        Jack Howden
      </Link> renamed <Link :class="classNames.nameText">
        DocumentTitle.docx
      </Link>
    </template>
    <template #comments>
      Hello, this is the text of my basic comment!
    </template>
    <template #timestamp>
      23m ago
    </template>
  </ActivityItem>

  <ActivityItem :class="classNames.exampleRoot" :activity-personas="activityPersonas2">
    <template #description>
      <Link :class="classNames.nameText">
        Javiera Márquez
      </Link> and <Link :class="classNames.nameText">
        Amelia Povaliy
      </Link> edited <Link :class="classNames.nameText">
        SpreadsheetTitle.xlsx
      </Link>
    </template>
    <template #timestamp>
      9:27 am
    </template>
  </ActivityItem>

  <ActivityItem :class="classNames.exampleRoot" :activity-personas="activityPersonas3">
    <template #description>
      <Link :class="classNames.nameText">
        Robert Larsson
      </Link> and <Link :class="classNames.nameText">
        2 others
      </Link> commented
    </template>
    <template #timestamp>
      3 days ago
    </template>
  </ActivityItem>

  <ActivityItem :class="classNames.exampleRoot" :activity-personas="activityPersonas4">
    <template #description>
      <Link :class="classNames.nameText">
        Jin Cheng
      </Link> and <Link :class="classNames.nameText">
        5 others
      </Link> edited this file
    </template>
    <template #timestamp>
      August 3, 2017
    </template>
  </ActivityItem>
</template>

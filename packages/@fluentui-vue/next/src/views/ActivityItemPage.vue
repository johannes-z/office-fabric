<script setup lang="ts">
import { useId } from '@fluentui-vue/hooks'
import { ref } from 'vue'
import { mergeStyleSets } from '@fluentui/merge-styles'
import { ActivityItem, Icon, Link } from '../components'
import DocumentCard from './components/DocumentCard.vue'

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
  <h1>ActivityItem</h1>

  <DocumentCard>
    <h2>Usage</h2>

    <h3>Activity Items with Icons</h3>
    <ActivityItem :class="classNames.exampleRoot">
      <template #icon>
        <Icon icon-name="Trash" />
      </template>
      <template #description>
        <Link :class="classNames.nameText">
          Philippe Lampros
        </Link> commented
      </template>
      <template #comments>
        Hello! I am making a comment and mentioning <Link :class="classNames.nameText">
          @Anđela Debeljak
        </Link> in the text of the comment.
      </template>
      <template #timestamp>
        Just now
      </template>
    </ActivityItem>

    <ActivityItem :class="classNames.exampleRoot">
      <template #icon>
        <Icon icon-name="Trash" />
      </template>
      <template #description>
        <Link :class="classNames.nameText">
          Lisha Refai
        </Link> deleted <span :class="classNames.nameText">DocumentTitle.docx</span>
      </template>
      <template #timestamp>
        2 hours ago
      </template>
    </ActivityItem>

    <ActivityItem :class="classNames.exampleRoot">
      <template #icon>
        <Icon icon-name="FabricMovetoFolder" />
      </template>
      <template #description>
        <Link :class="classNames.nameText">
          Julian Arvidsson
        </Link> moved <Link :class="classNames.nameText">
          PresentationTitle.pptx
        </Link> to <Link :class="classNames.nameText">
          Destination Folder
        </Link>
      </template>
      <template #timestamp>
        Yesterday
      </template>
    </ActivityItem>

    <h3>Activity Items with Personas</h3>
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

    <h3>Compact Activity Items</h3>
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
  </DocumentCard>
</template>

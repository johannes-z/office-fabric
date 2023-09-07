<script setup lang="ts">
import { ActivityItem, Icon, Link } from '@fluentui-vue/components'
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
</template>

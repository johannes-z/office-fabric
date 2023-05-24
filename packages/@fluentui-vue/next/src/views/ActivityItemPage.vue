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
  </DocumentCard>
</template>

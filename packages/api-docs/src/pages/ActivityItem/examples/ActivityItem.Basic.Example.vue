<template>
  <div>
    <f-activity-item :class="classNames.exampleRoot">
      <template #icon>
        <f-icon icon-name="Message" />
      </template>
      <template #activityDescription>
        <f-link :class="classNames.nameText">Philippe Lampros</f-link> commented
      </template>
      <template #comments>
        <span>I am making a comment and mentioning </span>
        <f-link :class="classNames.nameText">@Anđela Debeljak</f-link>
        <span> in the text of the comment.</span>
      </template>
      <template #timeStamp>
        Just now
      </template>
    </f-activity-item>

    <f-activity-item :class="classNames.exampleRoot">
      <template #icon>
        <f-icon icon-name="Delete" />
      </template>
      <template #activityDescription>
        <f-link :class="classNames.nameText">Lisha Refai</f-link> deleted <b>DocumentTitle.docx</b>
      </template>
      <template #timeStamp>
        Just now
      </template>
    </f-activity-item>

    <f-activity-item :class="classNames.exampleRoot">
      <template #icon>
        <f-icon icon-name="FabricMovetoFolder" />
      </template>
      <template #activityDescription>
        <f-link :class="classNames.nameText">Julian Arvidsson</f-link>
        moved
        <f-link :class="classNames.nameText">PresentationTitle.pptx</f-link>
        to
        <f-link :class="classNames.nameText">Destination Folder</f-link>
      </template>
      <template #timeStamp>
        Yesterday
      </template>
    </f-activity-item>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mergeStyleSets } from '@uifabric/styling'

@Component({
  components: {},
})
export default class ActivityItemBasicExample extends Vue {
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

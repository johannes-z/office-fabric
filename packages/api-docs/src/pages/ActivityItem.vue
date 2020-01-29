<template>
  <div>
    <h1>ActivityItem</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default ActivityItem</h2>

      <f-activity-item>
        <template #icon>
          <f-icon icon-name="Message" />
        </template>
        <template #description>
          <f-link href="#">Philippe Lampros</f-link> commented
        </template>
        <template #comments>
          I am making a comment and mentioning <f-link href="#">@Anđela Debeljak</f-link>
          in the text of the comment.
        </template>
        <template #timeStamp>
          Just now
        </template>
      </f-activity-item>

      <f-activity-item>
        <template #icon>
          <f-icon icon-name="Delete" />
        </template>
        <template #description>
          <f-link href="#">Lisha Refai</f-link> deleted <b>DocumentTitle.docx</b>
        </template>
        <template #timeStamp>
          Just now
        </template>
      </f-activity-item>

      <f-activity-item>
        <template #icon>
          <f-icon icon-name="FabricMovetoFolder" />
        </template>
        <template #description>
          <f-link href="#">Julian Arvidsson</f-link> moved
          <f-link>PresentationTitle.pptx</f-link> to
          <f-link>Destination Folder</f-link>
        </template>
        <template #timeStamp>
          Yesterday
        </template>
      </f-activity-item>

      <f-activity-item comments="Test">
        <template #icon>
          <f-icon icon-name="FabricMovetoFolder" />
        </template>
        <template #description>
          <f-link href="#">Julian Arvidsson</f-link> moved
          <f-link>PresentationTitle.pptx</f-link> to
          <f-link>Destination Folder</f-link>
        </template>
      </f-activity-item>
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
export default class ActivityItemPage extends Vue {
}
</script>

<style lang="scss" module>
.header {
  padding-top: 18px;
  padding-right: 24px;
  padding-bottom: 12px;
  padding-left: 24px;
}
.title {
  font-size: 20px;
  font-weight: 300;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  color: rgb(50, 49, 48);
}
.inner {
  height: 100%;
  padding-top: 0px;
  padding-right: 24px;
  padding-bottom: 20px;
  padding-left: 24px;
}
.subtext {
  font-size: 12px;
  font-weight: 300;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  color: rgb(50, 49, 48);
}
</style>

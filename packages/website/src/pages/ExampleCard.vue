<template>
  <div class="ExampleCard">
    <div class="ExampleCard-header">
      <span class="ExampleCard-title">{{ title }}</span>
    </div>

    <div class="ExampleCard-example">
      <component :is="view" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class ExampleCard extends Vue {
  @Prop({ type: String, required: true }) title!: any
  @Prop({ type: Function, required: true }) view!: any
}
</script>

<style lang="scss" scoped>
.ExampleCard {
  & {
    margin-top: 20px;
    margin-right: 0px;
    margin-bottom: 20px;
    margin-left: 0px;
  }
  &-header {
    display: flex;
    position: relative;
    border-bottom: 1px solid rgb(161, 159, 157);
    overflow: hidden;
  }
  &-title {
    font-size: 20px;
    font-weight: 600;
    color: #605e5c;
    margin-bottom: 10px;
  }
  &-example {
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 20px;
    padding-right: 4px;
    padding-bottom: 20px;
    padding-left: 4px;
    position: relative;
  }
}
</style>

<template>
  <div :class="$style.root">
    <div :class="$style.label">{{ label }}</div>
    <div :class="$style.flexContainer">
      <ChoiceField v-for="option in options"
                   :id="option.key"
                   :key="option.key"
                   v-bind="option"
                   :checked="selectedOption.key === option.key"
                   @click.native="selectedOption = option" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ChoiceField from './ChoiceField.vue'

@Component({
  components: { ChoiceField },
})
export default class ChoiceGroup extends Vue {
  @Prop({ default: null }) label!: string
  @Prop({ default: () => [] }) options!: any[]

  selectedOption: any = {}
}
</script>

<style lang="scss" module>
.root {
  font-size: 14px;
  font-weight: 400;
  display: block;
}
.label {
  font-size: 14px;
  font-weight: 600;
  color: rgb(50, 49, 48);
  box-sizing: border-box;
  box-shadow: none;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
  display: block;
  padding-top: 5px;
  padding-right: 0px;
  padding-bottom: 5px;
  padding-left: 0px;
  overflow-wrap: break-word;
}
.flexContainer {

}
</style>

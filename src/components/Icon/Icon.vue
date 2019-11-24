<template>
  <i :class="[
       $style.root,
       'ms-Icon',
       `ms-Icon--${iconName}`,
     ]"
     aria-hidden="true" />
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Icon extends Vue {
  @Prop({ type: String, required: true }) iconName!: string
}
</script>

<style lang="scss" module>
.root {
  display: inline-block;
  font-style: normal;
  font-weight: normal;
  font-family: FabricMDL2Icons;
}
</style>

<template>
  <div>
    <FontIcon icon-name="CompassNW" :class="iconClass" />
    <FontIcon icon-name="Dictionary" :class="iconClass" />
    <FontIcon icon-name="TrainSolid" :class="iconClass" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FontIcon } from '@uifabric-vue/office-ui-fabric-vue'
import { mergeStyles } from '@uifabric/styling'

@Component({
  components: { FontIcon },
})
export default class IconBasicExample extends Vue {
  iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
  });
}
</script>

<style lang="scss" scoped>
</style>

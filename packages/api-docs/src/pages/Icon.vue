<template>
  <div>
    <h1>Icon</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Icon</h2>
      <div>
        <f-icon icon-name="CompassNW" :class="iconClass" />
        <f-icon icon-name="Dictionary" :class="iconClass" />
        <f-icon icon-name="TrainSolid" :class="iconClass" />
      </div>

      <h2>Icon with custom color</h2>
      <div>
        <f-icon icon-name="CompassNW" :class="classNames.deepSkyBlue" />
        <f-icon icon-name="Dictionary" :class="classNames.greenYellow" />
        <f-icon icon-name="TrainSolid" :class="classNames.salmon" />
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { mergeStyles, mergeStyleSets, registerIcons } from '@uifabric/styling'

@Component({
  components: {
  },
})
export default class IconPage extends Vue {
  iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
  });

  classNames = mergeStyleSets({
    deepSkyBlue: [{ color: 'deepskyblue' }, this.iconClass],
    greenYellow: [{ color: 'greenyellow' }, this.iconClass],
    salmon: [{ color: 'salmon' }, this.iconClass],
  });
}
</script>

<style lang="scss" module>
</style>

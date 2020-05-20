<template>
  <div>
    <FontIcon icon-name="CompassNW" :class="classNames.deepSkyBlue" />
    <FontIcon icon-name="Dictionary" :class="classNames.greenYellow" />
    <FontIcon icon-name="TrainSolid" :class="classNames.salmon" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { FontIcon } from '@uifabric-vue/office-ui-fabric-vue'
import { mergeStyles, mergeStyleSets } from '@uifabric/styling'

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
})

@Component({
  components: { FontIcon },
})
export default class IconColorExample extends Vue {
  classNames = mergeStyleSets({
    deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
    greenYellow: [{ color: 'greenyellow' }, iconClass],
    salmon: [{ color: 'salmon' }, iconClass],
  });
}
</script>

<script setup lang="ts">
import { FontIcon, mergeStyleSets, mergeStyles } from '@fluentui-vue/components'

const iconClass = mergeStyles({
  fontSize: 50,
  height: 50,
  width: 50,
  margin: '0 25px',
})
const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: 'deepskyblue' }, iconClass],
  greenYellow: [{ color: 'greenyellow' }, iconClass],
  salmon: [{ color: 'salmon' }, iconClass],
})
</script>

<template>
  <div>
    <FontIcon aria-label="Compass" icon-name="CompassNW" :class="classNames.deepSkyBlue" />
    <FontIcon aria-label="Dictionary" icon-name="Dictionary" :class="classNames.greenYellow" />
    <FontIcon aria-label="Train" icon-name="TrainSolid" :class="classNames.salmon" />
  </div>
</template>

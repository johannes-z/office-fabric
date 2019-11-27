<template>
  <nav role="navigation" :class="$style.root">
    <NavLinks v-for="(group, index) in groups"
              :key="index"
              :class="$style.groupContent"
              :links="group.links" />
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ActionButton from '@/components/Button/ActionButton.vue'
import NavLinks from './NavLinks.vue'
import { CreateElement, VNode } from 'vue'

@Component({
  components: { ActionButton, NavLinks },
})
export default class Nav extends Vue {
   @Prop({ required: true }) groups!: any[]

   render (h: CreateElement): VNode {
     return (
       <nav>
        Test
       </nav>
     )
   }
}
</script>

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  user-select: none;
}
.groupContent {
  display: block;
  margin-bottom: 40px;
  animation-name: css-0, css-13;
  animation-duration: 0.367s;
  animation-timing-function: cubic-bezier(0.1, 0.9, 0.2, 1);
  animation-fill-mode: both;
}
</style>

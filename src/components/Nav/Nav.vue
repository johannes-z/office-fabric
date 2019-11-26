<template>
  <nav role="navigation" :class="$style.root">
    <div v-for="(group, index) in groups"
         :key="index"
         :class="$style.group">
      <div :class="$style.groupContent">
        <ul :class="$style.navItems">
          <li v-for="link in group.links"
              :key="link.key"
              :class="$style.navItem">
            <div :class="$style.compositeLink">
              <ActionButton :href="link.url"
                            :target="link.target"
                            :disabled="link.disabled"
                            :class="$style.link"
                            @click.native="link.onLinkClick">
                {{ link.name }}
              </ActionButton>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ActionButton from '@/components/Button/ActionButton.vue'

@Component({
  components: { ActionButton },
})
export default class Nav extends Vue {
   @Prop({ required: true }) groups!: any[]
   test: string = 'nav'
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
.navItems {
  list-style-type: none;
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
}
.navItem {
  padding-top: 0px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;
}
.compositeLink {
  display: block;
  position: relative;
  color: rgb(50, 49, 48);
}
.link {
  position: relative;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  display: block;
  cursor: pointer;
  vertical-align: top;
  padding-top: 0px;
  padding-right: 20px;
  padding-bottom: 0px;
  padding-left: 27px;
  height: 44px;
  color: rgb(50, 49, 48);
  background-color: transparent;
  width: 100%;
  line-height: 44px;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
  outline: transparent;
  border-width: 1px;
  border-style: solid;
  border-color: transparent;
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;
  overflow: hidden;
}
</style>

<template>
  <ul :class="$style.navItems">
    <li v-for="link in links"
        :key="link.key"
        :class="$style.navItem">
      <div :class="$style.compositeLink">
        <ActionButton :href="link.url"
                      :target="link.target"
                      :disabled="link.disabled"
                      :class="$style.link"
                      :style="{ paddingLeft: `${level * 14}px` }"
                      @click.native="onLinkClick(link)">
          {{ link.name }}
        </ActionButton>
      </div>

      <NavLinks v-if="link.links && link.isExpanded"
                :links="link.links"
                :level="level + 1" />
    </li>
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ActionButton from '@/components/Button/ActionButton.vue'

@Component({
  components: {
    ActionButton,
    NavLinks: () => import('./NavLinks.vue'),
  },
})
export default class NavLinks extends Vue {
  @Prop() links!: any[]
  @Prop({ default: 0 }) level!: number

  private onLinkClick (link: any) {
    console.log(link)
    if (link.onLinkClick) link.onLinkClick()
    link.isExpanded = !link.isExpanded
  }
}
</script>

<style lang="scss" module>
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

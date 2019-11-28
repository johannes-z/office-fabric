<template>
  <div v-bind="css.root" role="navigation">
    <ol v-bind="css.list">
      <li v-bind="css.listItem">
        <template v-for="(item, index) in items">
          <o-link :key="`link-${index}`"
                  v-bind="css.itemLink"
                  :href="item.href">
            <div>Test</div>
          </o-link>
          <o-icon v-if="index !== (items.length - 1)"
                  :key="`icon-${index}`"
                  v-bind="css.chevron"
                  icon-name="ChevronRight" />
        </template>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IBreadcrumbProps, IBreadcrumbStyles, IBreadcrumbItem } from './Breadcrumb.types'
import BaseComponent from '../BaseComponent'

@Component({
  components: {},
})
export default class Breadcrumb extends BaseComponent<IBreadcrumbProps, IBreadcrumbStyles> {
  @Prop({ required: true }) items!: IBreadcrumbItem[]

  get baseStyles (): IBreadcrumbStyles {
    return {
      root: [
        'ms-Breadcrumb',
        this.$style.root,
      ],
      list: [
        'ms-Breadcrumb-list',
        this.$style.list,
      ],
      listItem: [
        'ms-Breadcrumb-listItem',
        this.$style.listItem,
      ],
      itemLink: [
        'ms-Breadcrumb-itemLink',
        this.$style.itemLink,
      ],
      chevron: [
        'ms-Breadcrumb-chevron',
        this.$style.chevron,
      ],
    }
  }
}
</script>

<style lang="scss" module>
.root {
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 400;
  margin-top: 11px;
  margin-right: 0px;
  margin-bottom: 1px;
  margin-left: 0px;

  .list {
    white-space: nowrap;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    display: flex;
    align-items: stretch;
  }
  .overflow {
    position: relative;
    display: flex;
    align-items: center;
  }
  .listItem {
    list-style-type: none;
    margin-top: 0px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
    padding-top: 0px;
    padding-right: 0px;
    padding-bottom: 0px;
    padding-left: 0px;
    display: flex;
    position: relative;
    align-items: center;
  }
  .itemLink {
    font-size: 18px;
    font-weight: 400;
    color: rgb(96, 94, 92);
    border-top-width: initial;
    border-right-width: initial;
    border-left-width: initial;
    border-top-color: initial;
    border-right-color: initial;
    border-left-color: initial;
    cursor: pointer;
    display: inline;
    margin-right: 0px;
    margin-left: 0px;
    padding-top: 0px;
    padding-right: 8px;
    padding-bottom: 0px;
    padding-left: 8px;
    text-align: left;
    text-overflow: ellipsis;
    position: relative;
    white-space: nowrap;
    line-height: 36px;
    user-select: text;
    outline: transparent;
    background: none transparent;
    border-style: none none solid;
    border-image: initial;
    overflow: hidden;
    border-bottom: 1px solid transparent;

    &:hover {
      color: rgb(50, 49, 48);
      background-color: rgb(243, 242, 241);
      cursor: pointer;
      text-decoration: none;
    }
  }
  .chevron {
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    font-style: normal;
    font-weight: normal;
    speak: none;
    font-family: FabricMDL2Icons;
    color: rgb(96, 94, 92);
    font-size: 12px;
  }
}
</style>

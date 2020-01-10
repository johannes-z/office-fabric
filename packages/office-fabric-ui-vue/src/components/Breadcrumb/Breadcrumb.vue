<template>
  <div :class="classNames.root" role="navigation">
    <ol :class="classNames.list">
      <li v-for="(item, index) in items"
          :key="index"
          :class="classNames.listItem">
        <o-link v-if="item.onClick || item.href"
                :class="classNames.itemLink"
                :href="item.href"
                @click="onBreadcrumbClicked($event, item)">
          {{ item.text }}
        </o-link>

        <span v-else
              :class="classNames.item"
              @click="onBreadcrumbClicked($event, item)">
          {{ item.text }}
        </span>

        <o-icon v-if="index !== (items.length - 1)"
                :key="`icon-${index}`"
                :class="classNames.chevron"
                icon-name="ChevronRight" />
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { IBreadcrumbProps, IBreadcrumbStyles, IBreadcrumbItem } from './Breadcrumb.types'
import BaseComponent from '../BaseComponent'
import { getStyles } from './Breadcrumb.styles'
import { classNamesFunction } from '@uifabric-vue/utilities'

const getClassNames = classNamesFunction<any, IBreadcrumbStyles>()

@Component({
  components: {},
})
export default class Breadcrumb extends BaseComponent<IBreadcrumbProps, IBreadcrumbStyles> {
  @Prop({ type: Array, required: true }) items!: IBreadcrumbItem[]

  get classNames () {
    const { className, theme } = this
    return getClassNames(getStyles, {
      theme,
      className,
    })
  }

  private onBreadcrumbClicked (event: MouseEvent, item: IBreadcrumbItem) {
    if (item.onClick) {
      item.onClick(event, item)
    }
  }
}
</script>

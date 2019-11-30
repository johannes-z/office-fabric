<template>
  <div :class="classNames.root" role="navigation">
    <ol :class="classNames.list">
      <li :class="classNames.listItem">
        <template v-for="(item, index) in items">
          <o-link :key="`link-${index}`"
                  :class="classNames.itemLink"
                  :href="item.href">
            <div>Test</div>
          </o-link>
          <o-icon v-if="index !== (items.length - 1)"
                  :key="`icon-${index}`"
                  :class="classNames.chevron"
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
import { getClassNames } from '../../util/getClassNames'
import { getStyles } from './Breadcrumb.styles'

@Component({
  components: {},
})
export default class Breadcrumb extends BaseComponent<IBreadcrumbProps, IBreadcrumbStyles> {
  @Prop({ required: true }) items!: IBreadcrumbItem[]

  get classNames () {
    const { className, theme } = this
    return getClassNames(getStyles, {
      className,
      theme: theme,
    })
  }
}
</script>

<template>
  <div :class="classNames.root">
    <div :class="classNames.itemContainer">
      <ul :class="classNames.members" role="listbox">
        <FacepileButton />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import BaseComponent from '../BaseComponent'
import { classNamesFunction } from '@uifabric-vue/utilities'
import FacepileButton from './FacepileButton/FacepileButton.vue'

const getClassNames = classNamesFunction()

@Component({
  components: { FacepileButton },
})
export default class Facepile extends BaseComponent {
  get classNames () {
    return getClassNames(this.styles, {
      theme: this.theme!,
      className: this.className,
    })
  }
}
</script>

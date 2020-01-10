<template>
  <BaseButton variant-class-name="ms-Button--facepile" :styles="customStyles">FacepileButton</BaseButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './FacepileButton.styles'
import BaseComponent from '../../BaseComponent'
import { BaseButton } from '../../Button/'

@Component({
  components: { BaseButton },
})
export default class FacepileButton extends BaseComponent {
  get customStyles () {
    return getStyles(this.theme, this.className, this.styles)
  }
}
</script>

<template>
  <DefaultButton :styles="customStyles"><slot /></DefaultButton>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { getStyles } from './MessageBarButton.styles'
import BaseComponent from '../../BaseComponent'
import { DefaultButton } from '../'

@Component({
  components: { DefaultButton },
})
export default class MessageBarButton extends BaseComponent {
  get customStyles () {
    return getStyles(this.theme, this.styles)
  }
}
</script>

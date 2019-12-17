<template>
  <div>Stack</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class Stack extends Vue {
  @Prop({ default: false }) reversed!: boolean
  @Prop({ default: '' }) verticalAlign!: string
  @Prop({ default: false }) verticalFill!: boolean
  @Prop({ default: false }) wrap!: boolean
}
</script>

<template>
  <div>Stack</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class Stack extends Vue {
  @Prop({ type: Boolean, default: false }) reversed!: boolean
  @Prop({ type: String, default: '' }) verticalAlign!: string
  @Prop({ type: Boolean, default: false }) verticalFill!: boolean
  @Prop({ type: Boolean, default: false }) wrap!: boolean
}
</script>

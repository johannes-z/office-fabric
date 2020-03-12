import { Component, Prop } from 'vue-property-decorator'
import Vue from 'vue'

@Component
export class DelayedRender extends Vue {
  @Prop({ type: Number, default: 0 }) delay!: number

  timeoutId: number | undefined
  isRendered: boolean = false

  mounted () {
    this.timeoutId = setTimeout(() => {
      this.isRendered = true
    }, this.delay)
  }

  beforeDestroy () {
    if (this.timeoutId) clearTimeout(this.timeoutId)
  }

  render () {
    return this.isRendered ? (
      <div>{this.$slots.default}</div>
    ) : null
  }
}

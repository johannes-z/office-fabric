import { Component, Prop } from 'vue-property-decorator'
import Vue, { CreateElement } from 'vue'

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

  render (h: CreateElement) {
    return this.isRendered ? h('div', [this.$slots.default]) : null
  }
}

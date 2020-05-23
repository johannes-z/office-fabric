<template>
  <div class="ExampleCard">
    <div class="ExampleCard-header">
      <span class="ExampleCard-title">{{ title }}</span>
      <ActionButton class="ExampleCard-code-button"
                    :icon-props="{ iconName: 'Embed' }"
                    @click.native="showCode = !showCode">
        {{ showCode ? 'Hide code' : 'Show code' }}
      </ActionButton>
    </div>

    <div v-if="showCode"
         ref="code"
         class="ExampleCard-code"
         style="height: 500px" />
    <div class="ExampleCard-example">
      <component :is="view" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { ActionButton } from '@uifabric-vue/office-ui-fabric-vue'

import * as monaco from 'monaco-editor'

console.log(monaco)

@Component({
  components: { ActionButton },
})
export default class ExampleCard extends Vue {
  $refs!: {
    code: HTMLPreElement
  }

  @Prop({ type: String, required: true }) title!: string
  @Prop({ type: Function, required: true }) view!: any
  @Prop({ type: String, required: true }) code!: string

  showCode: boolean = false

  @Watch('showCode')
  async onShowCode (newVal: boolean, oldVal: boolean) {
    if (!newVal) return
    await this.$nextTick()

    monaco.editor.create(this.$refs.code, {
      minimap: { enabled: false },
      value: this.code,
      language: 'html',
      lineNumbers: 'off',
      scrollBeyondLastLine: false,
      readOnly: true,
      folding: true,
      fontSize: 12,
      lineHeight: 19,
    })
  }
}
</script>

<style lang="scss" scoped>
.ExampleCard {
  & {
    margin-top: 20px;
    margin-right: 0px;
    margin-bottom: 20px;
    margin-left: 0px;
  }
  &-header {
    display: flex;
    position: relative;
    border-bottom: 1px solid rgb(161, 159, 157);
    overflow: hidden;
  }
  &-title {
    font-size: 20px;
    font-weight: 600;
    color: #605e5c;
    margin-bottom: 10px;
    flex-grow: 1;
    flex-shrink: 1;
  }
  &-example {
    max-height: 80vh;
    overflow-x: hidden;
    overflow-y: auto;
    padding-top: 20px;
    padding-right: 4px;
    padding-bottom: 20px;
    padding-left: 4px;
    position: relative;
  }
  &-code-button {
    position: relative;
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    font-weight: 400;
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    cursor: pointer;
    padding-top: 4px;
    padding-right: 12px;
    padding-bottom: 4px;
    padding-left: 12px;
    height: 40px;
    color: rgb(50, 49, 48);
    margin-right: 0px;
    min-width: 100px;
    line-height: 1;
    user-select: none;
    outline: transparent;
    border-width: 1px 1px 0px;
    border-style: solid solid solid;
    border-color: rgb(161, 159, 157) rgb(161, 159, 157) rgb(161, 159, 157);
    border-image: initial;
    text-decoration: none;
    border-radius: 4px 4px 2px 2px;
    background: none;
    border-bottom: 0px;
    transition: border 0.367s cubic-bezier(0.1, 0.9, 0.2, 1) 0s;
  }
  &-code {
    background-color: rgb(243, 242, 241);
    display: block;
    margin-bottom: 20px;
    border-width: 0px 1px 1px;
    border-style: solid solid solid;
    border-color: rgb(161, 159, 157) rgb(161, 159, 157) rgb(161, 159, 157);
    border-image: initial;
    border-top: 0px;
  }
}
</style>

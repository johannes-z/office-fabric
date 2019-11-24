<template>
  <div>
    <h1>TextField</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Basic TextFields</h2>
      <FabricTextField label="Standard" />
      <FabricTextField label="Placeholder" placeholder="I am a placeholder" />
      <FabricTextField label="Disabled"
                       value="I am disabled"
                       disabled />
      <FabricTextField label="Read-only"
                       value="I am read-only"
                       readonly />
      <FabricTextField label="Required " required />
      <FabricTextField required />
      <FabricTextField label="With error message" error-message="Error message" />

      <h2>Controlled TextFields</h2>
      <FabricTextField v-model="value1" label="Basic controlled TextField" />
      {{ value1 }}
      <div style="width: 200px">
        <FabricTextField v-model="value2"
                         :maxlength="5"
                         label="Controlled TextField limiting length of value to 5" />
        {{ value2 }}
      </div>

      <h2>Multiline TextField</h2>
      <FabricTextField label="Standard"
                       multiline
                       :rows="3" />
      <FabricTextField label="Disabled"
                       multiline
                       disabled
                       :value="lorem"
                       :rows="3" />
      <FabricTextField label="Non-resizable"
                       multiline
                       :resizable="false"
                       :rows="3" />
      <FabricTextField label="With auto adjusting height"
                       multiline
                       auto-adjust-height />
      <FabricTextField
        label="Switches from single to multiline if more than 50 characters are
    entered"
        auto-adjust-height
        :multiline="multiline"
        :value="multilineValue"
        @input="onInput" />
      <FabricTextField label="With error message"
                       error-message="Error message"
                       multiline
                       :rows="3" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricTextField from '@/components/TextField/TextField.vue'

var faker = require('faker')

@Component({
  components: {
    FabricTextField,
  },
})
export default class TextFieldPage extends Vue {
  value1: string = 'Test'
  value2: string = ''
  multilineValue: string = ''
  multiline: boolean = false
  lorem: string = faker.lorem.paragraphs()

  onInput (value: string) {
    this.multiline = value.length > 50
  }

  mounted () {
    setTimeout(() => (this.value1 = 'asdfasdf'), 1000)
  }
}
</script>

<style lang="scss" module>
</style>

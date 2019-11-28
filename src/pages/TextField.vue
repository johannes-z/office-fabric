<template>
  <div>
    <h1>TextField</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Basic TextFields</h2>
      <o-text-field label="Standard" />
      <o-text-field label="Placeholder" placeholder="I am a placeholder" />
      <o-text-field label="Disabled"
                    value="I am disabled"
                    disabled />
      <o-text-field label="Read-only"
                    value="I am read-only"
                    readonly />
      <o-text-field label="Required " required />
      <o-text-field required />
      <o-text-field label="With error message" error-message="Error message" />

      <h2>Controlled TextFields</h2>
      <o-text-field v-model="text1" label="Basic controlled TextField" />
      {{ text1 }}
      <div style="width: 200px">
        <o-text-field v-model="value2"
                      :maxlength="5"
                      label="Controlled TextField limiting length of value to 5" />
        {{ value2 }}
      </div>

      <h2>Multiline TextField</h2>
      <o-text-field label="Standard"
                    multiline
                    :rows="3" />
      <o-text-field label="Disabled"
                    multiline
                    disabled
                    :value="lorem"
                    :rows="3" />
      <o-text-field label="Non-resizable"
                    multiline
                    :resizable="false"
                    :rows="3" />
      <o-text-field label="With auto adjusting height"
                    multiline
                    auto-adjust-height />
      <o-text-field
        label="Switches from single to multiline if more than 50 characters are
    entered"
        auto-adjust-height
        :multiline="multiline"
        :value="multilineValue"
        @input="onInput" />
      <o-text-field label="With error message"
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

var faker = require('faker')

@Component({
  components: {
  },
})
export default class TextFieldPage extends Vue {
  text1: string = 'Test'
  value2: string = ''
  multilineValue: string = ''
  multiline: boolean = false
  lorem: string = faker.lorem.paragraphs()

  onInput (value: string) {
    this.multiline = value.length > 50
  }

  mounted () {
    setTimeout(() => (this.text1 = '123'), 2000)
  }
}
</script>

<style lang="scss" module>
</style>

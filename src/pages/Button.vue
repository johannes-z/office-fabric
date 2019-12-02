<template>
  <div>
    <h1>Button</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Button</h2>
      <h3>Default</h3>
      <o-default-button>Normal</o-default-button>
      <o-default-button checked>Checked</o-default-button>
      <o-default-button disabled>Disabled</o-default-button>
      <o-default-button checked disabled>Checked & Disabled</o-default-button>
      <o-default-button primary>With primary flag</o-default-button>

      <h3>Primary</h3>
      <o-primary-button>Normal</o-primary-button>
      <o-primary-button checked>Checked</o-primary-button>
      <o-primary-button disabled>Disabled</o-primary-button>
      <o-primary-button checked disabled>Checked & Disabled</o-primary-button>

      <h2>CommandBar Button</h2>
      <div style="display: flex; flex-direction: row; flex-wrap: nowrap; width: auto; height: 44px; box-sizing: border-box;">
        <o-command-bar-button icon-name="Mail">Normal</o-command-bar-button>
        <o-command-bar-button checked>Checked</o-command-bar-button>
        <o-command-bar-button disabled>Disabled</o-command-bar-button>
        <o-command-bar-button checked disabled>Checked & Disabled</o-command-bar-button>
      </div>

      <h2>Icon Button</h2>
      <o-icon-button :icon-props="{ iconName: 'Emoji2' }" />
      <o-icon-button :icon-props="{ iconName: 'Emoji2' }" checked />
      <o-icon-button :icon-props="{ iconName: 'Emoji2' }" disabled />
      <o-icon-button :icon-props="{ iconName: 'Emoji2' }"
                     checked
                     disabled />

      <h2>Action Button</h2>
      <o-action-button :icon-props="{ iconName: 'AddFriend' }">Normal</o-action-button>
      <o-action-button :icon-props="{ iconName: 'AddFriend' }" checked>Checked</o-action-button>
      <o-action-button :icon-props="{ iconName: 'AddFriend' }" disabled>Disabled</o-action-button>
      <o-action-button :icon-props="{ iconName: 'AddFriend' }"
                       checked
                       disabled>
        Checked & Disabled
      </o-action-button>

      <h2>Button-like Anchor</h2>
      <o-default-button href="https://google.at"
                        target="_blank"
                        title="open Google">
        Normal
      </o-default-button>
      <o-default-button href="https://google.at"
                        target="_blank"
                        title="open Google"
                        checked>
        Checked
      </o-default-button>
      <o-default-button href="https://google.at"
                        target="_blank"
                        title="open Google"
                        disabled>
        Disabled
      </o-default-button>
      <o-default-button href="https://google.at"
                        target="_blank"
                        title="open Google"
                        checked
                        disabled>
        Checked & Disabled
      </o-default-button>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class ButtonPage extends Vue {
}
</script>

<style lang="scss" scoped>
.ms-Button {
  margin: 0 6px;
}
</style>

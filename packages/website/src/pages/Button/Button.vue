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
      <f-default-button>Normal</f-default-button>
      <f-default-button checked>Checked</f-default-button>
      <f-default-button disabled>Disabled</f-default-button>
      <f-default-button checked disabled>Checked & Disabled</f-default-button>
      <f-default-button primary>With primary flag</f-default-button>

      <h3>Primary</h3>
      <f-primary-button>Normal</f-primary-button>
      <f-primary-button checked>Checked</f-primary-button>
      <f-primary-button disabled>Disabled</f-primary-button>
      <f-primary-button checked disabled>Checked & Disabled</f-primary-button>

      <h2>Compound Button</h2>
      <f-compound-button secondary-text="This is the secondary text.">Normal</f-compound-button>
      <f-compound-button secondary-text="This is the secondary text." checked>Checked</f-compound-button>
      <f-compound-button secondary-text="This is the secondary text." disabled>Disabled</f-compound-button>
      <f-compound-button secondary-text="This is the secondary text." primary>Primary Normal</f-compound-button>
      <f-compound-button secondary-text="This is the secondary text."
                         primary
                         checked>
        Primary Checked
      </f-compound-button>
      <f-compound-button secondary-text="This is the secondary text."
                         primary
                         disabled>
        Primary Disabled
      </f-compound-button>

      <h2>CommandBar Button</h2>
      <f-stack :tokens="{ childrenGap: 20 }">
        <f-stack :styles="{ root: { height: 44 } }" horizontal>
          <f-command-bar-button :icon-props="{ iconName: 'Mail' }">Send mail (Normal)</f-command-bar-button>
          <f-command-bar-button :icon-props="{ iconName: 'Mail' }" checked>Send mail (Checked)</f-command-bar-button>
          <f-command-bar-button :icon-props="{ iconName: 'Mail' }" disabled>Send mail (Disabled)</f-command-bar-button>
          <f-command-bar-button :icon-props="{ iconName: 'Mail' }"
                                checked
                                disabled>
            Send mail (Checked & Disabled)
          </f-command-bar-button>
        </f-stack>
        <f-stack :styles="{ root: { height: 44 } }" horizontal>
          <f-command-bar-button :icon-props="{ iconName: 'Add' }"
                                :menu-props="menuProps">
            New item (Normal)
          </f-command-bar-button>
          <f-command-bar-button :icon-props="{ iconName: 'Add' }"
                                :menu-props="menuProps"
                                checked>
            New item (Checked)
          </f-command-bar-button>
          <f-command-bar-button :icon-props="{ iconName: 'Add' }"
                                :menu-props="menuProps"
                                disabled>
            New item (Disabled)
          </f-command-bar-button>
          <f-command-bar-button :icon-props="{ iconName: 'Add' }"
                                :menu-props="menuProps"
                                checked
                                disabled>
            New item (Checked & Disabled)
          </f-command-bar-button>
        </f-stack>
      </f-stack>

      <h2>Icon Button</h2>
      <f-icon-button :icon-props="{ iconName: 'Emoji2' }" />
      <f-icon-button :icon-props="{ iconName: 'Emoji2' }" checked />
      <f-icon-button :icon-props="{ iconName: 'Emoji2' }" disabled />
      <f-icon-button :icon-props="{ iconName: 'Emoji2' }"
                     checked
                     disabled />

      <h2>Action Button</h2>
      <f-action-button :icon-props="{ iconName: 'AddFriend' }">Normal</f-action-button>
      <f-action-button :icon-props="{ iconName: 'AddFriend' }" checked>Checked</f-action-button>
      <f-action-button :icon-props="{ iconName: 'AddFriend' }" disabled>Disabled</f-action-button>
      <f-action-button :icon-props="{ iconName: 'AddFriend' }"
                       checked
                       disabled>
        Checked & Disabled
      </f-action-button>

      <h2>Button-like Anchor</h2>
      <f-default-button href="https://google.at"
                        target="_blank"
                        title="open Google">
        Normal
      </f-default-button>
      <f-default-button href="https://google.at"
                        target="_blank"
                        title="open Google"
                        checked>
        Checked
      </f-default-button>
      <f-default-button href="https://google.at"
                        target="_blank"
                        title="open Google"
                        disabled>
        Disabled
      </f-default-button>
      <f-default-button href="https://google.at"
                        target="_blank"
                        title="open Google"
                        checked
                        disabled>
        Checked & Disabled
      </f-default-button>

      <h2>Split Button</h2>
      <f-split-button>
        Test
      </f-split-button>
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
  menuProps: any = {
    items: [
      {
        key: 'emailMessage',
        text: 'Email message',
        iconProps: { iconName: 'Mail' },
      },
      {
        key: 'calendarEvent',
        text: 'Calendar event',
        iconProps: { iconName: 'Calendar' },
      },
    ],
  }
}
</script>

<style lang="scss" scoped>
.ms-Button {
  margin: 0 6px;
}
</style>

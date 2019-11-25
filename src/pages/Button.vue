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
      <FabricDefaultButton>Normal</FabricDefaultButton>
      <FabricDefaultButton checked>Checked</FabricDefaultButton>
      <FabricDefaultButton disabled>Disabled</FabricDefaultButton>
      <FabricDefaultButton checked disabled>Checked & Disabled</FabricDefaultButton>

      <h3>Primary</h3>
      <FabricDefaultButton primary>Normal</FabricDefaultButton>
      <PrimaryButton checked>Checked</PrimaryButton>
      <PrimaryButton disabled>Disabled</PrimaryButton>
      <PrimaryButton checked disabled>Checked & Disabled</PrimaryButton>

      <h2>CommandBar Button</h2>
      <div style="display: flex; flex-direction: row; flex-wrap: nowrap; width: auto; height: 44px; box-sizing: border-box;">
        <CommandBarButton icon-name="Mail">Normal</CommandBarButton>
        <CommandBarButton checked>Checked</CommandBarButton>
        <CommandBarButton disabled>Disabled</CommandBarButton>
        <CommandBarButton checked disabled>Checked & Disabled</CommandBarButton>
      </div>

      <h2>Icon Button</h2>
      <IconButton icon-name="Upload" />
      <IconButton icon-name="Upload" checked />
      <IconButton icon-name="Upload" disabled />
      <IconButton icon-name="Upload"
                  checked
                  disabled />

      <h2>Action Button</h2>
      <ActionButton icon-name="AddFriend">Normal</ActionButton>
      <ActionButton icon-name="AddFriend" checked>Checked</ActionButton>
      <ActionButton icon-name="AddFriend" disabled>Disabled</ActionButton>
      <ActionButton icon-name="AddFriend"
                    checked
                    disabled>
        Checked & Disabled
      </ActionButton>

      <h2>Button-like Anchor</h2>
      <FabricDefaultButton href="https://google.at"
                           target="_blank"
                           title="open Google">
        Normal
      </FabricDefaultButton>
      <FabricDefaultButton href="https://google.at"
                           target="_blank"
                           title="open Google"
                           checked>
        Checked
      </FabricDefaultButton>
      <FabricDefaultButton href="https://google.at"
                           target="_blank"
                           title="open Google"
                           disabled>
        Disabled
      </FabricDefaultButton>
      <FabricDefaultButton href="https://google.at"
                           target="_blank"
                           title="open Google"
                           checked
                           disabled>
        Checked & Disabled
      </FabricDefaultButton>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import FabricDefaultButton from '@/components/Button/DefaultButton.vue'
import PrimaryButton from '../components/Button/PrimaryButton.vue'
import IconButton from '../components/Button/IconButton.vue'
import ActionButton from '../components/Button/ActionButton.vue'
import CommandBarButton from '../components/Button/CommandBarButton.vue'

@Component({
  components: {
    FabricDefaultButton,
    PrimaryButton,
    IconButton,
    ActionButton,
    CommandBarButton,
  },
})
export default class ButtonPage extends Vue {
}
</script>

<style lang="scss" scoped>
.ms-Button {
  margin: 0 6px;
}
</style>

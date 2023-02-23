<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Nav } from '../components'

import ButtonPage from './ButtonPage.vue'
import CheckboxPage from './CheckboxPage.vue'
import IconPage from './IconPage.vue'
import LabelPage from './LabelPage.vue'
import LinkPage from './LinkPage.vue'
import ProgressIndicatorPage from './ProgressIndicatorPage.vue'
import SearchBoxPage from './SearchBoxPage.vue'
import SpinnerPage from './SpinnerPage.vue'
import TextFieldPage from './TextFieldPage.vue'

import CalloutPage from './CalloutPage.vue'
import TogglePage from './TogglePage.vue'
import StackPage from './StackPage.vue'
import ImagePage from './ImagePage.vue'
import SeparatorPage from './SeparatorPage.vue'
import CommandBarPage from './CommandBarPage.vue'
import ContextualMenuPage from './ContextualMenuPage.vue'
import DialogPage from './DialogPage.vue'

const navLinkGroups: INavLinkGroup[] = [
  {
    links: [
      {
        name: 'Toggle',
        url: '/#/Toggle',
        key: 'Toggle',
      },
      {
        name: 'Home',
        url: 'http://example.com',
        expandAriaLabel: 'Expand Home section',
        links: [
          {
            name: 'Activity',
            url: 'http://msn.com',
            key: 'key1',
            target: '_blank',
          },
          {
            name: 'MSN',
            url: 'http://msn.com',
            disabled: true,
            key: 'key2',
            target: '_blank',
          },
        ],
        isExpanded: true,
      },
      {
        name: 'Documents',
        url: 'http://example.com',
        key: 'key3',
        isExpanded: true,
        target: '_blank',
      },
      {
        name: 'Pages',
        url: 'http://msn.com',
        key: 'key4',
        target: '_blank',
      },
      {
        name: 'Notebook',
        url: 'http://msn.com',
        key: 'key5',
        disabled: true,
      },
      {
        name: 'Communication and Media',
        url: 'http://msn.com',
        key: 'key6',
        target: '_blank',
      },
      {
        name: 'News',
        url: 'http://cnn.com',
        icon: 'News',
        key: 'key7',
        target: '_blank',
      },
    ],
  },
]
</script>

<template>
  <Nav :groups="navLinkGroups" />

  <RouterView />

  <div>
    <!-- <h2>Modal</h2>
    <h2>Persona</h2>
    <h2>PersonaPresence</h2>
    <h2>PersonaSize</h2>
    <h2>Dialog</h2>
    <ContextualMenuPage />
    <CommandBarPage />

    <CalloutPage />
    <DialogPage />

    <ButtonPage />
    <CheckboxPage />
    <LabelPage />
    <LinkPage />
    <SearchBoxPage />
    <TextFieldPage />
    <TogglePage />

    <ProgressIndicatorPage />
    <SpinnerPage />

    <IconPage />
    <ImagePage />
    <SeparatorPage />
    <StackPage /> -->
  </div>
</template>

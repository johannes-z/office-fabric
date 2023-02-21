<script setup lang="ts">
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
</script>

<template>
  <div>
    <h2>Callout</h2>
    <h2>Modal</h2>
    <h2>CommandBarButton</h2>
    <h2>CommandBar</h2>
    <h2>Persona</h2>
    <h2>PersonaPresence</h2>
    <h2>PersonaSize</h2>
    <h2>ContextualMenu</h2>
    <h2>Dialog</h2>
    <CalloutPage />

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
    <StackPage />
  </div>
</template>

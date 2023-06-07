<script setup lang="ts">
import { ref } from 'vue'
import { Checkbox, Label, Persona, PersonaSize, Stack } from '../components'
import DocSection from './components/DocSection.vue'
import type { IPersonaSharedProps } from '@/components/Persona'
import { PersonaPresence } from '@/components/Persona'

const renderDetails = ref(true)

const examplePersona: IPersonaSharedProps = {
  imageUrl: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/office-ui-fabric-react-assets/persona-female.png',
  imageInitials: 'AL',
  text: 'Annie Lindqvist',
  secondaryText: 'Software Engineer',
  tertiaryText: 'In a meeting',
  optionalText: 'Available at 4:00pm',
}
</script>

<template>
  <h1>Persona</h1>

  <DocSection>
    <h2>Usage</h2>

    <h3>Persona in various sizes</h3>
    <Stack :tokens="{ childrenGap: 10 }">
      <Checkbox
        v-model="renderDetails"
        label="Include persona details"
      />

      <Label>Size 8 Persona, with no presence</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size8"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, no presence detected"
      />
      <Label>Size 8 Persona, with presence</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size8"
        :presence="PersonaPresence.offline"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is offline"
      />
      <Label>Size 24 Persona</Label>
      <Persona
        v-bind="examplePersona"
        text="Annie Lindqvist (Available)"
        :size="PersonaSize.size24"
        :presence="PersonaPresence.online"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is online"
      />
      <Label>Size 32 Persona</Label>
      <Persona
        v-bind="examplePersona"
        text="Annie Lindqvist (Available)"
        :size="PersonaSize.size32"
        :presence="PersonaPresence.online"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is online"
      />

      <Label>Size 40 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size40"
        :presence="PersonaPresence.away"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is away"
      />

      <Label>Size 48 Persona (default) </Label>
      <Persona
        v-bind="examplePersona"
        :hide-persona-details="!renderDetails"
        :presence="PersonaPresence.busy"
        image-alt="Annie Lindqvist, status is busy"
      />

      <Label>Size 56 Persona (default) </Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size56"
        :hide-persona-details="!renderDetails"
        :presence="PersonaPresence.online"
        image-alt="Annie Lindqvist, status is online"
      />

      <Label>Size 72 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size72"
        :presence="PersonaPresence.dnd"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is dnd"
      />

      <Label>Size 100 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size100"
        :presence="PersonaPresence.blocked"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is blocked"
      />

      <Label>Size 120 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size120"
        :presence="PersonaPresence.away"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is away"
      />
    </Stack>
  </DocSection>
</template>

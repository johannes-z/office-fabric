<template>
  <div>
    <h1>Rating</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Base Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Persona in various sizes</h2>

      <Checkbox v-model="renderDetails" label="Include persona details" />

      <Label>Size 8 Persona, with no presence</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size8"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, no presence detected" />
      <Label>Size 8 Persona, with presence</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size8"
        :presence="PersonaPresence.offline"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is offline" />
      <Label>Size 24 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size24"
        :presence="PersonaPresence.online"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is online" />
      <Label>Size 32 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size32"
        :presence="PersonaPresence.online"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is online" />

      <Label>Size 40 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size40"
        :presence="PersonaPresence.away"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is away" />

      <Label>Size 48 Persona (default) </Label>
      <Persona
        v-bind="examplePersona"
        :hide-persona-details="!renderDetails"
        :presence="PersonaPresence.busy"
        image-alt="Annie Lindqvist, status is busy" />

      <Label>Size 56 Persona (default) </Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size56"
        :hide-persona-details="!renderDetails"
        :presence="PersonaPresence.online"
        image-alt="Annie Lindqvist, status is online" />

      <Label>Size 72 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size72"
        :presence="PersonaPresence.dnd"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is dnd" />

      <Label>Size 100 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size100"
        :presence="PersonaPresence.blocked"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is blocked" />

      <Label>Size 120 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size120"
        :presence="PersonaPresence.away"
        :hide-persona-details="!renderDetails"
        image-alt="Annie Lindqvist, status is away" />

      <Persona v-bind="examplePersona2"
               text="Kat Larrson"
               :size="PersonaSize.size24" />
      <Persona v-bind="examplePersona2"
               text="Annie"
               :size="PersonaSize.size24" />
      <Persona v-bind="examplePersona2"
               text="Annie Lind"
               :size="PersonaSize.size32" />
      <Persona v-bind="examplePersona2"
               text="Annie Boyl Lind"
               :size="PersonaSize.size32" />
      <Persona v-bind="examplePersona2"
               text="Annie Boyl Carrie Lindqvist"
               :size="PersonaSize.size40" />
      <Persona v-bind="examplePersona2"
               text="+1 (111) 123-4567 X4567"
               :size="PersonaSize.size40" />
      <Persona v-bind="examplePersona2"
               text="+1 (555) 123-4567 X4567"
               :size="PersonaSize.size48"
               allow-phone-initials />
      <Persona v-bind="examplePersona2"
               text="宋智洋"
               :size="PersonaSize.size48" />
      <Persona v-bind="examplePersona2"
               text="남궁 성종"
               :size="PersonaSize.size56" />
      <Persona v-bind="examplePersona2"
               text="خسرو رحیمی"
               :size="PersonaSize.size56" />
      <Persona v-bind="personaWithInitials"
               :initials-color="PersonaInitialsColor.lightBlue"
               :size="PersonaSize.size72" />
      <Persona v-bind="personaWithInitials"
               :initials-color="PersonaInitialsColor.magenta"
               :size="PersonaSize.size100" />
      <Persona v-bind="personaWithInitials"
               :initials-color="PersonaInitialsColor.teal"
               :coin-size="150" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Checkbox, Persona, Label, PersonaSize, PersonaPresence, PersonaInitialsColor } from '../components'

@Component({
  components: {
    Checkbox,
    Persona,
    Label,
  },
})
export default class PersonaPage extends Vue {
  PersonaSize = PersonaSize
  PersonaPresence = PersonaPresence
  PersonaInitialsColor = PersonaInitialsColor

  renderDetails: boolean = true

  examplePersona = {
    imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
    imageInitials: 'AL',
    text: 'Annie Lindqvist',
    secondaryText: 'Software Engineer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };

  examplePersona2 = {
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  };
  personaWithInitials = {
    ...this.examplePersona2,
    text: 'Maor Sharett',
    imageInitials: 'MS',
  };
}
</script>

<style lang="scss" module>
</style>

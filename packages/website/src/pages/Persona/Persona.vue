<template>
  <div>
    <h1>Rating</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Persona in various sizes</h2>

      <Checkbox v-model="renderDetails" label="Include persona details" />

      <Label>Size 8 Persona, with no presence</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size8"
        image-alt="Annie Lindqvist, no presence detected" />
      <Label>Size 8 Persona, with presence</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size8"
        :presence="PersonaPresence.offline"
        image-alt="Annie Lindqvist, status is offline" />
      <Label>Size 24 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size24"
        :presence="PersonaPresence.online"
        image-alt="Annie Lindqvist, status is online" />
      <Label>Size 32 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size32"
        :presence="PersonaPresence.online"
        image-alt="Annie Lindqvist, status is online" />

      <Label>Size 40 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size40"
        :presence="PersonaPresence.away"
        image-alt="Annie Lindqvist, status is away" />

      <Label>Size 48 Persona (default) </Label>
      <Persona
        v-bind="examplePersona"
        :presence="PersonaPresence.busy"
        image-alt="Annie Lindqvist, status is busy" />

      <Label>Size 56 Persona (default) </Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size56"
        :presence="PersonaPresence.online"
        image-alt="Annie Lindqvist, status is online" />

      <Label>Size 72 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size72"
        :presence="PersonaPresence.dnd"
        image-alt="Annie Lindqvist, status is dnd" />

      <Label>Size 100 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size100"
        :presence="PersonaPresence.blocked"
        image-alt="Annie Lindqvist, status is blocked" />

      <Label>Size 120 Persona</Label>
      <Persona
        v-bind="examplePersona"
        :size="PersonaSize.size120"
        :presence="PersonaPresence.away"
        image-alt="Annie Lindqvist, status is away" />

      <h2>Persona with initials</h2>
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

      <h2>PersonaCoin colors</h2>
      <Persona
        :initials-color="PersonaInitialsColor.green"
        v-bind="sharedPersonaProps"
        text="green10"
        image-alt="Green circle with the letter G in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.darkGreen"
        v-bind="sharedPersonaProps"
        text="darkGreen20"
        image-alt="Dark green circle with the letter D in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.teal"
        v-bind="sharedPersonaProps"
        text="teal10"
        image-alt="Teal circle with the letter T in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.cyan"
        v-bind="sharedPersonaProps"
        text="cyan30"
        image-alt="Cyan circle with the letter C in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.lightBlue"
        v-bind="sharedPersonaProps"
        text="lightBlue30"
        image-alt="Light blue circle with the letter L in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.blue"
        v-bind="sharedPersonaProps"
        text="blue20"
        image-alt="Blue circle with the letter B in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.darkBlue"
        v-bind="sharedPersonaProps"
        text="darkBlue10"
        image-alt="Dark blue circle with the letter D in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.violet"
        v-bind="sharedPersonaProps"
        text="violet10"
        image-alt="Violet circle with the letter V in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.purple"
        v-bind="sharedPersonaProps"
        text="purple10"
        image-alt="Purple circle with the letter P in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.magenta"
        v-bind="sharedPersonaProps"
        text="magenta10"
        image-alt="Magenta circle with the letter M in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.lightPink"
        v-bind="sharedPersonaProps"
        text="lightPink10"
        image-alt="Light pink circle with the letter L in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.pink"
        v-bind="sharedPersonaProps"
        text="pink10"
        image-alt="Pink circle with the letter P in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.burgundy"
        v-bind="sharedPersonaProps"
        text="pinkRed10"
        image-alt="Pink red (burgundy) circle with the letter P in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.lightRed"
        v-bind="sharedPersonaProps"
        text="red10"
        image-alt="Red circle with the letter R in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.darkRed"
        v-bind="sharedPersonaProps"
        text="darkRed20"
        image-alt="Dark red circle with the letter D in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.orange"
        v-bind="sharedPersonaProps"
        text="orange10"
        image-alt="Orange circle with the letter O in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.rust"
        v-bind="sharedPersonaProps"
        text="orange30"
        image-alt="Rusty orange circle with the letter O in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.gold"
        v-bind="sharedPersonaProps"
        text="orangeYellow20"
        image-alt="Orange yellow circle with the letter O in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.warmGray"
        v-bind="sharedPersonaProps"
        text="gray30"
        image-alt="Warm gray circle with the letter G in white text at the center" />
      <Persona
        :initials-color="PersonaInitialsColor.coolGray"
        v-bind="sharedPersonaProps"
        text="gray20"
        image-alt="Cool gray circle with the letter G in white text at the center" />

      <h2>Persona Presence</h2>

      <f-stack horizontal>
        <f-stack>
          <Label>Online</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.online"
              image-alt="Annie Lindqvist, status is online." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.online"
              image-alt="Annie Lindqvist, status is online." />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.online"
              image-alt="Annie Lindqvist, status is online." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.online"
              image-alt="Annie Lindqvist, status is online." />
          </f-stack>
        </f-stack>

        <f-stack>
          <Label>Online + Out of Office</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.online"
              is-out-of-office
              image-alt="Annie Lindqvist, status is online and out of office." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.online"
              is-out-of-office
              image-alt="Annie Lindqvist, status is online and out of office." />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.online"
              is-out-of-office
              image-alt="Annie Lindqvist, status is online and out of office." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.online"
              is-out-of-office
              image-alt="Annie Lindqvist, status is online and out of office." />
          </f-stack>
        </f-stack>
      </f-stack>

      <f-stack horizontal>
        <f-stack>
          <Label>Away</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.away"
              image-alt="Annie Lindqvist, status is away." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.away"
              image-alt="Annie Lindqvist, status is away." />
            <Persona v-bind="examplePersona"
                     hide-persona-details
                     :presence="PersonaPresence.away"
                     image-alt="Annie Lindqvist, status is away." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.away"
              image-alt="Annie Lindqvist, status is away." />
          </f-stack>
        </f-stack>

        <f-stack>
          <Label>Away + Out of Office</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.away"
              is-out-of-office
              image-alt="Annie Lindqvist, status is away and out of office." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.away"
              is-out-of-office
              image-alt="Annie Lindqvist, status is away and out of office." />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.away"
              is-out-of-office
              image-alt="Annie Lindqvist, status is away and out of office." />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.away"
              is-out-of-office
              image-alt="Annie Lindqvist, status is away and out of office." />
          </f-stack>
        </f-stack>
      </f-stack>

      <f-stack horizontal>
        <f-stack>
          <Label>Busy</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.busy"
              image-alt="Annie Lindqvist, status is busy" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.busy"
              image-alt="Annie Lindqvist, status is busy" />
            <Persona v-bind="examplePersona"
                     hide-persona-details
                     :presence="PersonaPresence.busy"
                     image-alt="Annie Lindqvist, status is busy" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.busy"
              image-alt="Annie Lindqvist, status is busy" />
          </f-stack>
        </f-stack>

        <f-stack>
          <Label>Busy + Out of Office</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.busy"
              is-out-of-office
              image-alt="Annie Lindqvist, status is busy and out of office" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.busy"
              is-out-of-office
              image-alt="Annie Lindqvist, status is busy and out of office" />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.busy"
              is-out-of-office
              image-alt="Annie Lindqvist, status is busy and out of office" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.busy"
              is-out-of-office
              image-alt="Annie Lindqvist, status is busy and out of office" />
          </f-stack>
        </f-stack>
      </f-stack>

      <f-stack horizontal>
        <f-stack>
          <Label>Do not Disturb</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              image-alt="Annie Lindqvist, status is do not disturb" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              image-alt="Annie Lindqvist, status is do not disturb" />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              image-alt="Annie Lindqvist, status is do not disturb" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              image-alt="Annie Lindqvist, status is do not disturb" />
          </f-stack>
        </f-stack>

        <f-stack>
          <Label>Do not Disturb + Out of Office</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              is-out-of-office
              image-alt="Annie Lindqvist, status is do not disturb and out of office" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              is-out-of-office
              image-alt="Annie Lindqvist, status is do not disturb and out of office" />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              is-out-of-office
              image-alt="Annie Lindqvist, status is do not disturb and out of office" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.dnd"
              is-out-of-office
              image-alt="Annie Lindqvist, status is do not disturb and out of office" />
          </f-stack>
        </f-stack>
      </f-stack>

      <f-stack horizontal>
        <f-stack>
          <Label>Blocked</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.blocked"
              image-alt="Annie Lindqvist, status is blocked" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.blocked"
              image-alt="Annie Lindqvist, status is blocked" />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.blocked"
              image-alt="Annie Lindqvist, status is blocked" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.blocked"
              image-alt="Annie Lindqvist, status is blocked" />
          </f-stack>
        </f-stack>
      </f-stack>

      <f-stack horizontal>
        <f-stack>
          <Label>Offline</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.offline"
              image-alt="Annie Lindqvist, status is offline" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.offline"
              image-alt="Annie Lindqvist, status is offline" />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.offline"
              image-alt="Annie Lindqvist, status is offline" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.offline"
              image-alt="Annie Lindqvist, status is offline" />
          </f-stack>
        </f-stack>

        <f-stack>
          <Label>Offline + Out of Office</Label>
          <f-stack horizontal>
            <Persona
              text=""
              :size="PersonaSize.size8"
              hide-persona-details
              :presence="PersonaPresence.offline"
              is-out-of-office
              image-alt="Annie Lindqvist, status is offline and out of office" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size24"
              hide-persona-details
              :presence="PersonaPresence.offline"
              is-out-of-office
              image-alt="Annie Lindqvist, status is offline and out of office" />
            <Persona
              v-bind="examplePersona"
              hide-persona-details
              :presence="PersonaPresence.offline"
              is-out-of-office
              image-alt="Annie Lindqvist, status is offline and out of office" />
            <Persona
              v-bind="examplePersona"
              :size="PersonaSize.size72"
              hide-persona-details
              :presence="PersonaPresence.offline"
              is-out-of-office
              image-alt="Annie Lindqvist, status is offline and out of office" />
          </f-stack>
        </f-stack>
      </f-stack>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { Checkbox, Persona, Label, PersonaSize, PersonaPresence, PersonaInitialsColor } from '@uifabric-vue/office-ui-fabric-vue'

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

  get examplePersona () {
    return {
      hidePersonaDetails: !this.renderDetails,
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'AL',
      text: 'Annie Lindqvist',
      secondaryText: 'Software Engineer',
      tertiaryText: 'In a meeting',
      optionalText: 'Available at 4:00pm',
    }
  }

  examplePersona2 = {
    secondaryText: 'Designer',
    tertiaryText: 'In a meeting',
    optionalText: 'Available at 4:00pm',
  }

  personaWithInitials = {
    ...this.examplePersona2,
    text: 'Maor Sharett',
    imageInitials: 'MS',
  }

  sharedPersonaProps = {
    size: PersonaSize.size100,
    styles: {
      root: {
        width: 300,
        margin: 5,
      },
    },
  }
}
</script>

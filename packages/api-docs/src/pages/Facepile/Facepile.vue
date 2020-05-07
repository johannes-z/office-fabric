<template>
  <div>
    <h1>Facepile</h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2>Default Facepile</h2>
      <div :class="styles.container">
        <f-facepile :personas="facepilePersonas" />
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { PersonaInitialsColor } from '@uifabric-vue/office-ui-fabric-vue'
import { mergeStyleSets } from '@uifabric/styling'

const styles = mergeStyleSets({
  container: {
    maxWidth: 300,
  },
  control: {
    paddingTop: 20,
  },
  slider: {
    margin: '10px 0',
  },
  checkbox: {
    paddingTop: 15,
  },
  dropdown: {
    paddingTop: 0,
    margin: '10px 0',
  },
})

@Component
export default class FacepilePage extends Vue {
  styles = styles

  facepilePersonas = [
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      personaName: 'Annie Lindqvist',
      data: '50%',
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      personaName: 'Aaron Reid',
      data: '$1,000',
    },
    {
      personaName: 'Alex Lundberg',
      data: '75%',
    },
    {
      personaName: 'Roko Kolar',
      data: '4 hrs',
    },
    {
      imageInitials: 'CB',
      personaName: 'Christian Bergqvist',
      initialsColor: PersonaInitialsColor.green,
      data: '25%',
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'VL',
      personaName: 'Valentina Lovric',
      initialsColor: PersonaInitialsColor.lightBlue,
      data: 'Emp1234',
    },
    {
      imageInitials: 'MS',
      personaName: 'Maor Sharett',
      initialsColor: PersonaInitialsColor.lightGreen,
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'PV',
      personaName: 'Annie Lindqvist2',
      initialsColor: PersonaInitialsColor.lightPink,
    },
    {
      imageInitials: 'AR',
      personaName: 'Aaron Reid2',
      initialsColor: PersonaInitialsColor.magenta,
      data: 'Emp1234',
    },
    {
      imageInitials: 'AL',
      personaName: 'Alex Lundberg2',
      initialsColor: PersonaInitialsColor.orange,
    },
    {
      imageInitials: 'RK',
      personaName: 'Roko Kolar2',
      initialsColor: PersonaInitialsColor.pink,
    },
    {
      imageInitials: 'CB',
      personaName: 'Christian Bergqvist2',
      initialsColor: PersonaInitialsColor.purple,
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'VL',
      personaName: 'Valentina Lovric2',
      initialsColor: PersonaInitialsColor.red,
    },
    {
      imageInitials: 'MS',
      personaName: 'Maor Sharett2',
      initialsColor: PersonaInitialsColor.teal,
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'VL',
      personaName: 'Another A Name',
      initialsColor: PersonaInitialsColor.blue,
    },
    {
      imageInitials: 'MS',
      personaName: 'Another A Name (So Many A names!)',
      initialsColor: PersonaInitialsColor.darkBlue,
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'VL',
      personaName: 'Another Anecdotal A Name',
      initialsColor: PersonaInitialsColor.darkGreen,
    },
    {
      imageInitials: 'MS',
      personaName: 'Anerobic A Name',
      initialsColor: PersonaInitialsColor.darkRed,
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'VL',
      personaName: 'Aerobic A Name',
      initialsColor: PersonaInitialsColor.green,
    },
    {
      imageInitials: 'MS',
      personaName: 'Maor Sharett2',
      initialsColor: PersonaInitialsColor.lightBlue,
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'VL',
      personaName: 'Valentina Lovric2',
      initialsColor: PersonaInitialsColor.lightGreen,
    },
    {
      imageInitials: 'MS',
      personaName: 'Maor Sharett2',
      initialsColor: PersonaInitialsColor.lightPink,
    },
    {
      imageUrl: 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png',
      imageInitials: 'VL',
      personaName: 'Valentina Lovric2',
      initialsColor: PersonaInitialsColor.magenta,
    },
    {
      imageInitials: 'MS',
      personaName: 'Maor Sharett2',
      initialsColor: PersonaInitialsColor.orange,
    },
  ]
}
</script>

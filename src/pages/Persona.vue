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
      <o-persona :size="40" image-url="https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import OPersona from '@/components/Persona/Persona.vue'

@Component({
  components: {
    OPersona,
  },
})
export default class PersonaPage extends Vue {
}
</script>

<style lang="scss" module>
</style>

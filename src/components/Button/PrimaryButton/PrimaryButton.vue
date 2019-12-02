<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import DefaultButton from '../DefaultButton/DefaultButton.vue'

@Component
export default class PrimaryButton extends DefaultButton {
  @Prop({ type: Boolean, default: true }) primary!: boolean
}
</script>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import DefaultButton from './DefaultButton.vue'

@Component
export default class PrimaryButton extends DefaultButton {
  @Prop({ type: Boolean, default: true }) primary!: boolean
}
</script>

<style lang="scss" module>

.root {
  position: relative;
  font-size: 14px;
  font-weight: 400;
  box-sizing: border-box;
  display: inline-block;
  text-align: center;
  cursor: pointer;
  vertical-align: top;
  padding: 0 16px;
  min-width: 80px;
  height: 32px;
  background-color: var(--fabric-white);
  color: var(--fabric-neutralPrimary);
  user-select: none;
  outline: transparent;

  border-width: 1px;
  border-style: solid;
  border-color: var(--fabric-neutralPrimaryAlt);
  border-image: initial;
  text-decoration: none;
  border-radius: 2px;

  &:hover {
    background-color: rgb(243, 242, 241);
  }
  &:active {
    background-color: rgb(237, 235, 233);
  }
}
</style>

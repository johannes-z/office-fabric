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
      <h2>Rating</h2>
      Default:
      <o-rating />
      Stars size 40:
      <o-rating :min="0"
                :max="5"
                :rating="3"
                aria-label-format="Select {0} of {1} stars"
                :size="40" />
      Stars size 8:
      <o-rating :min="0"
                :max="5"
                :rating="3"
                aria-label-format="Select {0} of {1} stars"
                :size="8" />
      Disabled :
      <o-rating :min="0"
                :max="5"

                :rating="2.7"
                aria-label-format="Select {0} of {1} stars"
                disabled />
      Half star in readOnly mode:
      <o-rating :min="0"
                :max="5"
                :rating="2.5"
                :size="20"
                aria-label-format="Select {0} of {1} stars"
                readonly />
      Custom icons:
      <o-rating :min="0"
                :max="5"
                :rating="3"
                icon-name="StarburstSolid"
                aria-label-format="Select {0} of {1} stars"
                unselected-icon-name="Starburst" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ORating from '@/components/Rating/Rating.vue'

@Component({
  components: {
    ORating,
  },
})
export default class RatingPage extends Vue {
}
</script>

<style lang="scss" module>
</style>

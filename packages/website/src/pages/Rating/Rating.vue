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
      <h2>Rating</h2>
      Large Stars:
      <Rating :min="0"
              :max="5"
              :rating="3"
              aria-label-format="Select {0} of {1} stars"
              :size="RatingSize.Large" />
      Small Stars:
      <Rating :min="0"
              :max="5"
              :rating="3"
              aria-label-format="Select {0} of {1} stars"
              :size="RatingSize.Small" />
      10 Small Stars:
      <Rating :min="0"
              :max="10"
              :rating="1"
              aria-label-format="Select {0} of {1} stars" />
      Disabled :
      <Rating :min="0"
              :max="5"
              :rating="1"
              aria-label-format="Select {0} of {1} stars"
              disabled />
      Half star in readOnly mode:
      <Rating :min="0"
              :max="5"
              :rating="2.5"
              aria-label-format="Select {0} of {1} stars"
              readonly />
      Custom icons:
      <Rating :min="0"
              :max="5"
              :rating="2.5"
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
import { Rating, RatingSize } from '@uifabric-vue/office-ui-fabric-vue'
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {
    Rating,
  },
})
export default class RatingPage extends Vue {
  RatingSize = RatingSize
}
</script>

<style lang="scss" module>
</style>

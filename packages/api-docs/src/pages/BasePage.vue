<template>
  <div>
    <h1><slot /></h1>
    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
      <slot name="overview" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
      <div class="doSection">
        <h3>Do</h3>
        <div class="doList">
          <slot name="dos" />
        </div>
      </div>
      <div class="dontSection">
        <h3>Don't</h3>
        <div class="dontList">
          <slot name="donts" />
        </div>
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>
      <h2><slot /></h2>

      <slot name="usage" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>

      <slot name="implementation" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({
  components: {},
})
export default class BasePage extends Vue {

}
</script>

<style lang="scss" >

.doList, .dontList {
  ul {
    padding-left: 24px;
  }
  ul > li {
    font-size: 14px;
    list-style: none!important;
    margin-bottom: 20px;
    position: relative;

    &:before {
      font-family: FabricMDL2Icons;
      display: block;
      position: absolute;
      top: 1px;
    }
  }
}

.doList {
  li:before {
    left: -24px;
    content: "\E8FB";
    color: #107c10;
  }
}
.dontList {
  li:before {
    left: -24px;
    content: "\E711";
    color: #e81123;
  }
}

.doSection {
  margin-bottom: -10px;
  width: calc(50% - 14px);

  margin-right: 28px;

  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
}
.dontSection {
  margin-bottom: -10px;
  width: calc(50% - 14px);

  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
}
</style>

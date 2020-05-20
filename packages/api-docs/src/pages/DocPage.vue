<template>
  <div>
    <h1 v-if="docs.isHeaderVisible">
      {{ docs.title }}
      <small>
        <a :href="docs.componentUrl">
          <img :src="githubLogo" width="20">
        </a>
      </small>
    </h1>

    <div class="content--inner ms-depth-8">
      <h2>Overview</h2>
      <div v-html="docs.overview" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Best Practices</h2>
      <div v-html="docs.bestPractices" />

      <div class="doSection">
        <h3>Do</h3>
        <div class="doList" v-html="docs.dos" />
      </div>

      <div class="dontSection">
        <h3>Don't</h3>
        <div class="dontList" v-html="docs.donts" />
      </div>
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Usage</h2>

      <ExampleCard v-for="example in docs.examples"
                   :key="example.title"
                   v-bind="example" />
    </div>

    <div class="content--inner ms-depth-8">
      <h2>Implementation</h2>

      <div class="Implementation" v-html="docs.implementation" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ExampleCard from './ExampleCard.vue'

import githubLogo from '../../assets/github.svg'

@Component({
  components: { ExampleCard },
})
export default class DocPage extends Vue {
  @Prop({ type: Object, required: true }) docs!: any

  githubLogo = githubLogo
}
</script>

<style lang="scss">
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

.Implementation {
  table {
    width: 100%;
    border-spacing: 0;

    tr:hover {
      td {
        background-color: #efefef;
      }
    }

    td:first-child {
      white-space: nowrap;
    }

    th, td {
      padding: 6px 12px;
    }
    th {
      border-bottom: 2px solid #ddd;
    }
    td {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>

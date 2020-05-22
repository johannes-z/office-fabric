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

      <div class="Implementation">
        <h1 v-if="types.members.length">Types</h1>
        <div v-for="member in types.members"
             :key="member.name">
          <h2>{{ member.name }}</h2>
          <p>{{ member.description }}</p>

          <table v-if="member.type === 'Interface'">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Required</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="prop in member.properties" :key="prop.name">
                <td>{{ prop.name }}{{ prop.required ? '' : '?' }}</td>
                <td>{{ prop.type }}</td>
                <td>{{ prop.required }}</td>
                <td>{{ prop.default }}</td>
                <td>{{ prop.description }}</td>
              </tr>
            </tbody>
          </table>

          <div v-else-if="member.type === 'Type alias'">
            <code>export declare type {{ member.name }} = {{ member.value }}</code>
          </div>
        </div>

        <div v-html="api" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ExampleCard from './ExampleCard.vue'

import githubLogo from '../../assets/github.svg'
import { DetailsList } from '@uifabric-vue/office-ui-fabric-vue'

@Component({
  components: { ExampleCard, DetailsList },
})
export default class DocPage extends Vue {
  @Prop({ type: Object, required: true }) docs!: any

  githubLogo = githubLogo

  get types () {
    return this.docs.implementation.types || {}
  }

  get api () {
    return this.docs.implementation.api || {}
  }
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
      text-align: left;
      padding: 8px 12px;
    }
    th {
      border-bottom: 1px solid #ddd;
    }
    td {
      border-bottom: 1px solid #efefef;
    }
  }
}
</style>

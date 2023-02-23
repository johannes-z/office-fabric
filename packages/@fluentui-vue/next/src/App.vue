<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { INavLinkGroup } from './components'
import { Nav } from './components'
import { nav } from './router/routes'

console.log(nav)

const navLinkGroups: INavLinkGroup[] = nav
</script>

<template>
  <div style="display: grid; grid-template-columns: 300px auto">
    <div>
      <Nav :groups="navLinkGroups" />
    </div>

    <div>
      <RouterView />
    </div>
  </div>
</template>

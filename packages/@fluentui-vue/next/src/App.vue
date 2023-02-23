<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { INavLinkGroup } from './components'
import { Nav } from './components'
import { nav } from './router/routes'

console.log(nav)

const navLinkGroups: INavLinkGroup[] = nav
</script>

<template>
  <div style="display: grid; grid-template-columns: 250px 1fr; max-width: 100%;">
    <div>
      <Nav :groups="navLinkGroups" />
    </div>

    <div style="display: flex; flex: 1; flex-direction: column; overflow: hidden;">
      <RouterView />
    </div>
  </div>
</template>

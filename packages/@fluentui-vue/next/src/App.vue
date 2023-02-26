<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import type { INavLinkGroup } from './components'
import { Nav } from './components'
import { nav } from './router/routes'

console.log(nav)

const navLinkGroups: INavLinkGroup[] = nav
</script>

<template>
  <div style="display: grid; grid-template-columns: 300px 1fr; max-width: 100%; max-height: 100vh;">
    <div style="background: white; margin-right: 50px; overflow-y: auto; max-height: 100vh;">
      <Nav :groups="navLinkGroups" />
    </div>

    <div style="display: flex; flex: 1; flex-direction: column; overflow-y: auto; max-height: 100vh;">
      <RouterView />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import type { INavLinkGroup } from './components'
import { Nav } from './components'
import { nav } from './router/routes'

const navLinkGroups: INavLinkGroup[] = nav

const router = useRouter()
const currentUrl = computed(() => router.currentRoute.value.path)
</script>

<template>
  <div style="display: grid; grid-template-columns: 300px 1fr; max-width: 100%; max-height: 100vh;">
    <div style="background: white; margin-right: 50px; overflow-y: auto; max-height: 100vh;">
      <Nav :groups="navLinkGroups" :selected-key="currentUrl" />
    </div>

    <div style="display: flex; flex: 1; flex-direction: column; overflow-y: auto; max-height: 100vh;">
      <RouterView />
    </div>
  </div>
</template>

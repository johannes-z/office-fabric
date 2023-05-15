<script setup lang="ts">
import { type Ref, ref } from 'vue'
import type { IBreadcrumbItem } from '../components'
import { Breadcrumb, Label } from '../components'
import DocumentCard from './components/DocumentCard.vue'
import type { ILabelStyles } from '@/components/Label/Label.types'

const labelStyles: Partial<ILabelStyles> = {
  root: { margin: '10px 0', selectors: { '&:not(:first-child)': { marginTop: 24 } } },
}

const items: Ref<IBreadcrumbItem[]> = ref([
  { text: 'Files', key: 'Files', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 1', key: 'f1', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 2', key: 'f2', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 3', key: 'f3', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 4 (non-clickable)', key: 'f4' },
  { text: 'Folder 5', key: 'f5', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 6', key: 'f6', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 7', key: 'f7', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 8', key: 'f8', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 9', key: 'f9', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 10', key: 'f10', onClick: _onBreadcrumbItemClicked },
  { text: 'Folder 11', key: 'f11', onClick: _onBreadcrumbItemClicked, isCurrentItem: true },
])

function _onBreadcrumbItemClicked(ev: MouseEvent, item: IBreadcrumbItem): void {
  console.trace(`Breadcrumb item with key "${item.key}" has been clicked.`)
}
</script>

<template>
  <h1>Breadcrumb</h1>

  <DocumentCard>
    <h2>Usage</h2>

    <Label :styles="labelStyles">With items rendered as buttons</Label>
    <Breadcrumb :items="items" />
  </DocumentCard>
</template>

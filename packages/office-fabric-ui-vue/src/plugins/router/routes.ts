import * as components from '@/components'

const routes: any[] = []
for (const name in components) {
  routes.push({
    name,
    path: `/${name}`,
    component: () => import(`@/pages/${name}.vue`),
    props: {},
  })
}

export default routes

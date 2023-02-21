import { initializeFileTypeIcons } from '@fluentui-vue/file-type-icons'
import { initializeIcons } from '@fluentui-vue/icons'
import { createApp, defineComponent, h } from 'vue'

import MainPage from './views/MainPage.vue'

initializeFileTypeIcons()
initializeIcons()

const App = defineComponent({
  setup() {
    return () => h('div', {}, [
      h(MainPage),
    ])
  },
})

const app = createApp(App)

app.mount('#app')

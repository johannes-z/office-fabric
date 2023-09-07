import { initializeFileTypeIcons } from '@fluentui-vue/file-type-icons'
import { initializeIcons } from '@fluentui-vue/icons'
import { createApp } from 'vue'

import router from './router'

import App from './App.vue'

initializeFileTypeIcons()
initializeIcons()

const app = createApp(App)
app.use(router)

app.mount('#app')

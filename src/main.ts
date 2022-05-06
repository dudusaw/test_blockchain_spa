import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import naive from 'naive-ui'
import { createPinia } from 'pinia'
import { Chart } from 'chart.js'

Chart.defaults.color = "white";

createApp(App)
  .use(router)
  .use(createPinia())
  .use(naive)
  .mount('#app')

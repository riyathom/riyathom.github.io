import { createApp } from 'vue'
import { Quasar } from 'quasar'
import 'quasar/src/css/index.sass'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(Quasar, { config: {} })
  .use(router)
  .mount('#app')
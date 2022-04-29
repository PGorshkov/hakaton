import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import rir from './plugins/RirLib'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  $rir: rir,
  render: h => h(App)
}).$mount('#app')

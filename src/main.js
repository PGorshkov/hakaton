import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import VueTabs from 'vue-nav-tabs'
import 'vue-nav-tabs/themes/vue-tabs.css'
import _ from 'lodash'
import rir from './plugins/RirLib'

window._ = _

Vue.use(VueAxios, axios)
Vue.use(VueGoodTablePlugin)
Vue.use(VueTabs)

Vue.config.productionTip = false
// key yandex map = fee24ec6-6a43-4a33-b410-d8fdee4f412e
new Vue({
  router,
  store,
  $rir: rir,
  render: h => h(App)
}).$mount('#app')

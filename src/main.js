import Vue from 'vue'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

axios.defaults.baseURL = 'http://keysstash-laravel'
let tokenData = JSON.parse(window.localStorage.getItem('user'))
axios.defaults.headers.common.Accept = 'application/json'
axios.defaults.headers.common.Authorization = tokenData ? `Bearer ${tokenData.auth.access_token}` : 'Bearer NO DATA'

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'KeysStash' // https://github.com/vuejs/vue-router/issues/914
  tokenData = JSON.parse(window.localStorage.getItem('user'))
  axios.defaults.headers.common.Authorization = tokenData ? `Bearer ${tokenData.auth.access_token}` : 'Bearer NO DATA'
  if (to.meta.requiresAuth) {
    if (window.localStorage.getItem('user') !== null) {
      next()
    } else {
      next({ name: 'auth', params: { action: 'login' } })
    }
  }
  if (to.meta.requiresGuest) {
    if (window.localStorage.getItem('user') !== null) {
      store.dispatch('logout')
        .then(() => next())
        .catch(error => console.log(error))
    } else {
      next()
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

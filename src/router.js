import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Keys from './views/keys/Index.vue'
import AddGame from './views/games/Add.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/keys',
      name: 'keys',
      component: Keys
    },
    {
      path: '/games/add',
      name: 'addGame',
      component: AddGame
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Games from './views/Games/Index.vue'
import Game from './views/Games/Show.vue'
import AddGame from './views/Games/Add.vue'
import Auth from './views/Auth/Index.vue'
import Profile from './views/Users/Show.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'KeysStash :: Home'
      }
    },

    {
      path: '/games',
      name: 'games.index',
      component: Games,
      meta: {
        title: 'KeysStash :: Games',
        requiresAuth: true
      }
    },

    {
      path: '/game/:id',
      name: 'games.show',
      component: Game,
      props: true,
      meta: {
        title: 'KeysStash :: Game',
        requiresAuth: true,
      }
    },

    {
      path: '/games/add',
      name: 'games.create',
      component: AddGame,
      meta: {
        title: 'KeysStash :: Add Game',
        requiresAuth: true
      }
    },

    {
      path: '/auth/:action',
      name: 'auth',
      component: Auth,
      props: true,
      meta: {
        title: 'KeysStash :: Authentication',
        requiresGuest: true
      }
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        title: 'KeysStash :: Profile',
        requiresAuth: true
      }
    },

    {
      path: '*',
      redirect: '/'
    }
  ]
})

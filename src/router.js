import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Keys from './views/keys/Index.vue'
import AddGame from './views/games/Add.vue'
import Auth from './views/auth/Index.vue'
import Profile from './views/users/Show.vue'

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
      path: '/keys',
      name: 'keys',
      component: Keys,
      meta: {
        title: 'KeysStash :: Keys',
        requiresAuth: true
      }
    },

    {
      path: '/games/add',
      name: 'addGame',
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

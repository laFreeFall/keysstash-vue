import Vue from 'vue'
import Vuex from 'vuex'
import users from './store/modules/users'
import stash from './store/modules/stash'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users,
    stash
  },

  state: {

  },

  mutations: {

  },

  actions: {

  }
})

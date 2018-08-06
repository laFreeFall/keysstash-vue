import Vue from 'vue'
import axios from 'axios'
import { normalize } from 'normalizr'
import { stashSchema } from '../schemas/stash'

const state = {
  stash: {},
  stashLoaded: false,
  searchFilter: ''
}

const mutations = {
  FETCH_STASH(state, payload) {
    state.stash = normalize(payload.games, stashSchema)
    state.stashLoaded = true
  },

  CHANGE_SEARCH_FILTER(state, filter) {
    state.searchFilter = filter.trim().toLowerCase()
  },

  TOGGLE_KEY_USED_STATUS(state, payload) {
    state.stash.entities.keys[payload.id].used = payload.value
  },

  ADD_KEY(state, key) {
    Vue.set(state.stash.entities.keys, key.id, key)
    state.stash.entities.games[key.game_id].keys.push(key.id)
  },

  ADD_GAME(state, game) {
    Vue.set(game, 'keys', [])
    Vue.set(state.stash.entities.games, game.id, game)
    state.stash.result.push(game.id)
  }
}

const actions = {
  fetchStash({ commit }) {
    return axios.get('/api/games')
      .then((response) => {
        commit('FETCH_STASH', response.data)
        return response.status
      })
      .catch((error) => {
        console.error(error)
        return Promise.reject(error)
      })
  },

  changeSearchFilter({ commit }, eventValue) {
    commit('CHANGE_SEARCH_FILTER', eventValue)
  },

  toggleKeyUsedStatus({ commit }, payload) {
    const requestType = payload.used ? 'delete' : 'post'
    return axios[requestType](`/api/keys/${payload.id}/use`)
      .then((response) => {
        commit('TOGGLE_KEY_USED_STATUS', {
          id: payload.id,
          value: response.data.value
        })
        return response.data.value
      })
      .catch((error) => {
        console.error(error)
        return Promise.reject(error)
      })
  },

  addKey({ commit }, payload) {
    return axios.post(`/api/games/${payload.game_id}/keys`, payload)
      .then((response) => {
        commit('ADD_KEY', response.data.key)
        return response.data.key
      })
      .catch((error) => {
        console.error(error)
        return Promise.reject(error)
      })
  },

  addGame({ commit }, payload) {
    return axios.post(`/api/games`, payload)
    .then((response) => {
      commit('ADD_GAME', response.data.game)
      return response.data.game
    })
    .catch((error) => {
      console.error(error)
      return Promise.reject(error)
    })
  }
}

const getters = {
  stashLoaded: state => state.stashLoaded,

  stash: state => state.stash,

  searchFilter: state => state.searchFilter
}

export default {
  state,
  getters,
  actions,
  mutations
}

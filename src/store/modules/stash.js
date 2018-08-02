import axios from 'axios'
import { normalize } from 'normalizr'
import { stashSchema } from '../schemas/stash'

const state = {
  stash: [],
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
  }
}

const actions = {
  fetchStash({ commit }) {
    return axios.get('/api/games')
      .then((response) => {
        commit('FETCH_STASH', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  changeSearchFilter({ commit }, eventValue) {
    commit('CHANGE_SEARCH_FILTER', eventValue)
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

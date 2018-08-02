import axios from 'axios'

const state = {
  stash: [],
  stashLoaded: false
}

const mutations = {
  FETCH_STASH(state, payload) {
    state.stash = payload.games
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
  }
}

const getters = {
  stashLoaded: state => state.stashLoaded,

  stash: state => state.stash,
}

export default {
  state,
  getters,
  actions,
  mutations
}

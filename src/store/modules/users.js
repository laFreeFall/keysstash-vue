import axios from 'axios'

const state = {
  clientId: 2,
  clientSecret: 'xP8dJHwpghMK29EqDZ3yAHZcJeBXquj93Be0W0HI',
  user: {
    auth: {},
    data: {}
  },
  userLogged: false
}

const mutations = {
  FETCH_USER_AUTH(state, payload) {
    state.user.auth = payload
  },

  FETCH_USER_DATA(state, payload) {
    state.user.data = payload
    state.userLogged = true
    window.localStorage.setItem('user', JSON.stringify(state.user))
  },

  FETCH_USER(state, payload) {
    state.user.auth = payload.auth
    state.user.data = payload.data
    state.userLogged = true
  },

  LOG_OUT(state) {
    state.user.auth = {}
    state.user.data = {}
    window.localStorage.removeItem('user')
    state.userLogged = false
  }
}

const actions = {
  login({ commit, state }, payload) {
    const postData = {
      grant_type: 'password',
      client_id: state.clientId,
      client_secret: state.clientSecret,
      username: payload.email,
      password: payload.password,
      scope: ''
    }

    return axios.post('/oauth/token', postData)
      .then((response) => {
        axios.defaults.headers.common.Authorization = response.data.access_token
        commit('FETCH_USER_AUTH', {
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token
        })

        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${response.data.access_token}`
        }
        return axios.get('/api/user', { headers })
          .then((response) => {
            commit('FETCH_USER_DATA', response.data)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.log(error)
      })
  },

  register(payload) {
    return axios.post('/api/register', payload)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  },

  fetchUserAuth({ commit }, payload) {
    commit('FETCH_USER_AUTH', payload)
  },

  fetchUserData({ commit }, payload) {
    commit('FETCH_USER_DATA', payload)
  },

  fetchUser({ commit }, payload) {
    commit('FETCH_USER', payload)
  },

  logout({ commit }) {
    commit('LOG_OUT')
  }
}

const getters = {
  clientId: state => state.clientId,

  clientSecret: state => state.clientSecret,

  user: state => state.user,

  userAuth: state => state.user.auth,

  userData: state => state.user.data,

  userLogged: state => state.userLogged
}

export default {
  state,
  getters,
  actions,
  mutations
}

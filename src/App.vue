<template>
  <div id="app">
    <app-header></app-header>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Header from './components/TheHeader.vue'

export default {
  components: {
    'app-header': Header
  },

  methods: {
    ...mapActions([
      'fetchUser'
    ])
  },

  created() {
    const userObj = JSON.parse(window.localStorage.getItem('user'))
    if (userObj !== null) {
      this.fetchUser(userObj)
    }
  }
}
</script>

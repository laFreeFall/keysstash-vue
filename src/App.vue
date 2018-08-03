<template>
  <div id="app">
    <app-header></app-header>
    <b-container>
      <router-view></router-view>
    </b-container>
    <notifications position="bottom right" classes="larger"></notifications>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Header from './components/TheHeader.vue'

export default {
  components: {
    'app-header': Header
  },

  methods: {
    ...mapActions([
      'fetchUser',
      'fetchStash'
    ])
  },

  computed: {
    ...mapGetters([
      'stashLoaded'
    ])
  },

  created() {
    const userObj = JSON.parse(window.localStorage.getItem('user'))
    if (userObj !== null) {
      this.fetchUser(userObj)
      if (!this.stashLoaded) {
        this.fetchStash()
      }
    }
  }
}
</script>

<style lang="scss">
@import 'assets/styles/notification';
</style>

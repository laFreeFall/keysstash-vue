<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="mb-3" fixed>
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand :to="{ name: 'home' }">{{ projectName }}</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item :to="{ name: 'games.index' }">Keys</b-nav-item>
        <b-nav-item :to="{ name: 'games.create' }">Add Game</b-nav-item>
      </b-navbar-nav>

      <b-nav-form class="mx-auto w-50">
          <b-form-input
            type="search"
            placeholder="Type to filter games..."
            class=" mx-auto w-50"
            @input="changeSearchFilter"
          >
          </b-form-input>
      </b-nav-form>

      <b-navbar-nav class="ml-auto">
        <template v-if="userLogged">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em>{{ userData.name }}</em>
            </template>
            <b-dropdown-item :to="{ name: 'profile' }">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
        <template v-else>
          <b-nav-item :to="{ name: 'auth', params: { action: 'login' } }">Log In</b-nav-item>
          <b-nav-item :to="{ name: 'auth', params: { action: 'register' } }">Sign Up</b-nav-item>
        </template>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      projectName: 'KeysStash'
    }
  },

  computed: {
    ...mapGetters([
      'userData',
      'userLogged'
    ])
  },

  methods: {
    ...mapActions([
      'changeSearchFilter',
      'logout'
    ]),

    logUserOut() {
      this.logout()
      this.$router.push({ name: 'home' })
    }
  }
};
</script>


<template>
  <b-row align-h="center">
    <b-col cols="6">
      <b-card header-tag="header">
        <h4 slot="header" class="text-center">
          Profile page
        </h4>
        <b-list-group>
          <b-list-group-item>
            <strong>Username</strong>: {{ userData.name }}
          </b-list-group-item>
          <b-list-group-item>
            <strong>Email</strong>: {{ userData.email }}
          </b-list-group-item>
          <b-list-group-item>
            <strong>User since </strong>{{ userData.created_at }}
          </b-list-group-item>
        </b-list-group>
        <b-alert show class="mt-3">
          {{ userLogged ? 'You are logged in' : 'You are not currently signed in'}}
        </b-alert>
        <b-button @click="logUserOut" v-show="userLogged">Logout</b-button>
        <b-button :to="{ name: 'auth', params: { action: 'login' } }" v-show="!userLogged">Login</b-button>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {

  computed: {
    ...mapGetters([
      'userData',
      'userLogged'
    ])
  },

  methods: {
    ...mapActions([
      'logout'
    ]),
    logUserOut() {
      this.logout()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

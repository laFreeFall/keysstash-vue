<template>
  <b-row align-h="center">
    <b-col cols="5">
      <b-card header-tag="header">
        <h4 slot="header" class="text-center">
          Profile page
        </h4>
        <b-list-group>
          <b-list-group-item>
            <span class="float-left font-weight-bold">
              Username
            </span>
            <b-badge variant="light" class="float-right">
             {{ userData.name }}
            </b-badge>
          </b-list-group-item>
          <b-list-group-item>
            <span class="float-left font-weight-bold">
              E-mail
            </span>
            <b-badge variant="light" class="float-right">
             {{ userData.email }}
            </b-badge>
          </b-list-group-item>
          <b-list-group-item v-show="userData.created_at">
            <span class="float-left font-weight-bold">
              User since
            </span>
            <b-badge variant="light" class="float-right">
             {{ userData.created_at }}
            </b-badge>
          </b-list-group-item>
        </b-list-group>

        <b-list-group v-if="stashLoaded" class="mt-3">
          <b-list-group-item>
            <span class="float-left font-weight-bold">
              Games stored in the stash
            </span>
            <b-badge variant="light" class="float-right">
              {{ gamesAmount }}
            </b-badge>
          </b-list-group-item>
          <b-list-group-item>
            <span class="float-left font-weight-bold">
              Keys stored in the stash
            </span>
            <b-badge variant="light" class="float-right">
              {{ keysAmount }}
            </b-badge>
          </b-list-group-item>
        </b-list-group>

        <div class="div mt-3">
          <b-button v-b-modal="'logout-modal'" v-if="userLogged">Logout</b-button>
          <b-button
            v-else
            :to="{ name: 'auth', params: { action: 'login' } }"
          >
            Login
          </b-button>
        </div>
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
      'userLogged',
      'stashLoaded',
      'gamesAmount',
      'keysAmount'
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

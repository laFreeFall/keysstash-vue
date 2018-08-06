<template>
  <b-modal id="logout-modal" ref="logoutModal" title="Logout">
    <p class="my-4">Are you sure that you want to log out?</p>
    <div slot="modal-footer" class="w-100">
      <b-btn
        class="float-left"
        variant="light"
        @click="hideModal"
      >
        No, cancel
      </b-btn>
      <b-btn
        class="float-right"
        variant="primary"
        @click="logUserOut"
      >
        Yes, logout
      </b-btn>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  methods: {
    ...mapActions([
      'logout'
    ]),

    logUserOut() {
      this.hideModal()
      this.logout()
      this.$router.push({ name: 'home' })
    },

    hideModal() {
      this.$refs.logoutModal.hide()
    }
  }
}
</script>

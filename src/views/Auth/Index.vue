<template>
  <b-row align-h="center">
    <b-col cols="6">
      <b-card header-tag="header">
        <h4 slot="header" class="text-center">
          {{ action | capitalize }}
        </h4>
        <b-form @submit.prevent="onSubmit">
          <b-form-group
            v-if="action === 'register'"
            label="Username"
            label-for="input-name"
          >
            <b-form-input
              id="input-name"
              type="text"
              v-model.lazy="formData.name"
              placeholder="Enter username"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Email" label-for="input-email">
            <b-form-input
              id="input-email"
              type="email"
              v-model.lazy="formData.email"
              placeholder="Enter email"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="input-password">
            <b-form-input
              id="input-password"
              type="password"
              v-model.lazy="formData.password"
              placeholder="Enter password"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group
            v-if="action === 'register'"
            label="Password confirmation"
            label-for="input-password-confirmation"
          >
            <b-form-input
              id="input-password-confirmation"
              type="password"
              v-model.lazy="formData.password_confirmation"
              placeholder="Enter password again"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            :disabled="submitDisabled"
          >
            {{ action | capitalize }}
          </b-button>
        </b-form>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  props: {
    action: {
      type: String
    }
  },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  computed: {
    ...mapGetters([
      'user',
      'userLogged'
    ]),
    loginDataValid() {
      return this.formData.email.length > 5
        && this.formData.password.length > 5
    },

    registerDataValid() {
      return this.formData.name.length > 1
        && this.formData.email.length > 5
        && this.formData.password.length > 5
        && this.formData.password_confirmation.length > 5
        // && this.formData.password === this.formData.password_confirmation
    },

    submitDisabled() {
      return !(this.action === 'login' ? this.loginDataValid : this.registerDataValid)
    }
  },

  methods: {
    ...mapActions([
      'login',
      'fetchStash'
    ]),
    onSubmit() {
      switch (this.action) {
        case 'login':
          if (this.loginDataValid) {
            this.login({
              email: this.formData.email,
              password: this.formData.password
            })
              .then(() => {
                this.fetchStash()
                this.$router.push({ name: 'profile' })
              })
              .catch(() => {
                this.$notify({
                  type: 'error',
                  title: 'Authorization error',
                  text: 'Error has happened while trying to authorize you. Please, try again.'
                })
              })
          }
          break
        case 'register':
          if (this.registerDataValid) {
            this.register(this.formData)
          }
          break
        default: console.error('Fatal. Unknown action type')
      }
    }
  }
}
</script>

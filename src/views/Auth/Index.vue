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
              v-model="form.name"
              placeholder="Enter username"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Email" label-for="input-email">
            <b-form-input
              id="input-email"
              type="email"
              v-model="form.email"
              placeholder="Enter email"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-form-group label="Password" label-for="input-password">
            <b-form-input
              id="input-password"
              type="password"
              v-model="form.password"
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
              v-model="form.password_confirmation"
              placeholder="Enter password again"
              required
            >
            </b-form-input>
          </b-form-group>

          <b-button
            type="submit"
            variant="primary"
            :disabled="$v.form.$invalid"
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
import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

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
      form: {
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
    ])
  },

  validations() {
    if (this.action === 'login') {
      return {
        form: {
          email: {
            required,
            email
          },
          password: {
            required,
            minLength: minLength(6)
          }
        }
      }
    } else {
      return {
        form: {
          email: {
            required,
            email
          },
          name: {
            required,
            minLength: minLength(2)
          },
          password: {
            required,
            minLength: minLength(6)
          },
          password_confirmation: {
            required,
            textMatch: sameAs('password')
          }
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'login',
      'register',
      'fetchStash'
    ]),
    onSubmit() {
      switch (this.action) {
        case 'login':
          if (!this.$v.form.$invalid) {
            this.login({
              email: this.form.email,
              password: this.form.password
            })
              .then(() => {
                this.fetchStash()
                this.$notify({
                  type: 'success',
                  title: 'Log in',
                  text: 'You\'ve logged in successfully.'
                })
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
          if (!this.$v.form.$invalid) {
            this.register(this.form)
              .then(() => {
                this.$notify({
                  type: 'success',
                  title: 'Registration',
                  text: 'You\'ve registered successfully. Now log in your account with your data'
                })
                this.$router.push({ name: 'auth', params: { action: 'login' } })
              })
              .catch(() => {
                this.$notify({
                  type: 'error',
                  title: 'Registration error',
                  text: 'Error has happened while trying to register your profile. Please, try again.'
                })
              })
          }
          break
        default:
          console.error('Fatal. Unknown action type')
          this.$notify({
            type: 'error',
            title: 'Unknown error',
            text: 'Somehow we\'ve got to the unknown action type (it may be either login or register)'
          })
      }
    }
  }
}
</script>

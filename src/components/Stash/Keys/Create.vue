<template>
  <b-form @submit.prevent="onSubmit">
    <div role="group">
      <b-input-group>
        <b-input-group-prepend>
          <b-btn
            @click="form.used = !form.used"
            variant="outline-info"
            title="Toggle key status"
            v-b-tooltip.hover
          >
            <icon :name="form.used ? 'toggle-on' : 'toggle-off'"></icon>
          </b-btn>
        </b-input-group-prepend>
        <b-form-input
          type="text"
          :placeholder="game.steam ? 'ABCDE-12345-F6G7H' : 'Enter your key...'"
          v-model="form.body"
          aria-describedby="keyBodyHelp"
        >
        </b-form-input>
        <b-input-group-append>
          <b-btn
            variant="info"
            type="submit"
            :disabled="$v.form.$invalid"
          >
            Add
          </b-btn>
        </b-input-group-append>
      </b-input-group>
      <b-form-text id="keyBodyHelp" class="text-center" v-show="game.steam">
        Key may contain only digits, letters and hyphens
      </b-form-text>
    </div>
  </b-form>
</template>

<script>
import { mapActions } from 'vuex'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/toggle-on'
import 'vue-awesome/icons/toggle-off'
import { required } from 'vuelidate/lib/validators'
import { SteamKey, OtherKey } from '../../../validations/keys'

export default {
  props: {
    game: {
      type: Object,
      required: true
    }
  },

  components: {
    Icon
  },

  data() {
    return {
      form: {
        used: false,
        body: '',
        game_id: this.game.id
      }
    }
  },

  validations() {
    if (this.game.steam) {
      return {
        form: {
          body: {
            required,
            SteamKey
          }
        }
      }
    } else {
      return {
        form: {
          body: {
            required,
            OtherKey
          }
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'addKey'
    ]),

    onSubmit() {
      if (!this.$v.form.$invalid) {
        this.addKey(this.form)
          .then(() => {
            this.$notify({
              type: 'success',
              title: 'Adding key',
              text: `Key ${this.form.body} was successfully added to your stash`
            })
            this.form.body = ''
          })
          .catch((error) => {
            this.$notify({
              type: 'error',
              title: 'Adding key',
              text: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]
            })
          })
      } else {
        this.$notify({
          type: 'warn',
          title: 'Adding key',
          text: 'We can\'t add your key at the moment because data is invalid'
        })
      }
    },
  }
}
</script>

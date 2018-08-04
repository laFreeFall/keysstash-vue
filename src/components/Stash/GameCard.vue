<template>
  <b-card
    :border-variant="game.keys.length ? 'info' : ''"
    :header-bg-variant="game.keys.length ? 'info' : 'light'"
    :header-text-variant="game.keys.length ? 'white' : ''"
    header-tag="header"
  >
    <div slot="header" class="text-center">
      <icon
        v-if="steamPlatform"
        name="brands/steam"
        scale="1.1"
      >
      </icon>
      {{ game.title }}
      <b-badge v-show="game.keys.length" variant="light">
        {{ game.keys.length}}
      </b-badge>
    </div>
    <b-list-group>
      <template v-for="(key, index) in game.keys">
        <b-list-group-item
          v-if="index === displayKeysAtOnce"
          :key="game.keys.length * 10 + index"
          @click="showHiddenKeys = !showHiddenKeys"
          class="text-center cursor-pointer"
          button
        >
          <span v-show="showHiddenKeys">
            Hide {{ hiddenKeysAmount }} keys
          </span>
          <span v-show="!showHiddenKeys">
            Show {{ hiddenKeysAmount}} more keys
          </span>
          <icon :name="showHiddenKeys ? 'caret-up' : 'caret-down'"></icon>
        </b-list-group-item>
        <app-game-key
          :key="key.id"
          :gameKey="key"
          :shown="isKeyShown(index)"
        >
        </app-game-key>
      </template>
    </b-list-group>
    <b-form @submit.prevent="onSubmit">
      <div role="group">
        <b-input-group>
          <b-input-group-prepend>
            <b-btn @click="form.used = !form.used" variant="outline-info">
              <icon :name="form.used ? 'toggle-on' : 'toggle-off'"></icon>
            </b-btn>
          </b-input-group-prepend>
          <b-form-input
            type="text"
            placeholder="ABCDE-12345-F6G7H"
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
        <b-form-text id="keyBodyHelp" class="text-center" v-show="steamPlatform">
          Key may contain only digits, letters and hyphens
        </b-form-text>
      </div>
    </b-form>
  </b-card>
</template>

<script>
import { mapActions } from 'vuex'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/brands/steam'
import 'vue-awesome/icons/toggle-on'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/caret-down'
import { required } from 'vuelidate/lib/validators'
import { SteamKey, OtherKey } from './../../validations/keys'
import GameKey from './GameKey.vue'

export default {
  components: {
    'app-game-key': GameKey,
    Icon
  },

  props: {
    game: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      form: {
        used: false,
        body: '',
        game_id: this.game.id
      },
      displayKeysAtOnce: 3,
      showHiddenKeys: false
    }
  },

  validations() {
    if (this.steamPlatform) {
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

  computed: {
    steamPlatform() {
      return this.game.steam_id !== null
    },

    hiddenKeysAmount() {
      return this.game.keys.length - this.displayKeysAtOnce
    },

    hasHiddenKeys() {
      return this.hiddenKeysAmount > 0
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

    isKeyShown(index) {
      if (index < this.displayKeysAtOnce) {
        return true
      }
      return this.showHiddenKeys
    }
  }
}
</script>

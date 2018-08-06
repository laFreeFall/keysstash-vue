<template>
  <b-row align-h="center">
    <b-col cols="8">
      <b-card header-tag="header">
        <h4 slot="header" class="text-center">
          Add new game
        </h4>
        <b-form @submit.prevent="onSubmit">
          <b-form-radio-group
            buttons
            button-variant="outline-info"
            :options="platform.options"
            v-model="form.steam"
            class="d-flex justify-content-center"
          >
          </b-form-radio-group>

          <v-select
            v-show="showSteamRelatedFields"
            label="title"
            :filterable="false"
            :options="options"
            placeholder="Enter game title..."
            @search="onSearch"
            v-model="select"
            @input="optionChosen"
            class="mt-3 mb-2"
          >
            <template slot="no-options">
              Type to search Steam games...
            </template>
            <template slot="option" slot-scope="option">
              {{ option.name }}
            </template>
            <template slot="selected-option" slot-scope="option">
              <div class="selected-option">
                {{ option.name }}
              </div>
            </template>
          </v-select>

          <b-form-group
            v-show="(form.steam && form.deleted) || !form.steam"
            label="Game title"
            description="Required"
          >
            <b-form-input
              type="text"
              v-model="form.title"
              placeholder="Enter title of the game..."
            ></b-form-input>
          </b-form-group>

          <b-form-checkbox
            v-show="form.steam"
            v-model="form.deleted"
            class="mb-3"
          >
            Game was removed from Steam Store
          </b-form-checkbox>

          <b-form-group
            v-show="showSteamRelatedFields"
            label="Steam App ID"
            description="Required. If you can't find id of the game, tick that game is deleted above"
          >
            <b-form-input
              type="number"
              min="0"
              step="1"
              v-model="form.steam_game_id"
              placeholder="Enter app id of the game on Steam"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            v-show="showSteamRelatedFields || !form.steam"
            label="Game link"
            description="Not required"
          >
            <b-form-input
              type="url"
              v-model="form.link"
              placeholder="Paste here link to the game on Steam"
            ></b-form-input>
          </b-form-group>

          <b-form-group label="Game image" description="Not required">
            <b-form-input
              type="url"
              v-model="form.image"
              placeholder="Past here link to the image of the game"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary" :disabled="$v.form.$invalid">
            Add game
          </b-button>
        </b-form>
        <div v-show="form.title" class="game-card-preview mt-3 mb-3">
          <h4 class="text-center">Game card preview</h4>
          <game-card-preview
            :title="form.title"
            :steam="form.steam"
            :image="imageUrl"
          ></game-card-preview>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import vSelect from 'vue-select'
import debounce from 'debounce'
import axios from 'axios'
import { mapActions } from 'vuex'
import { required, requiredIf, minLength, minValue, integer, url } from 'vuelidate/lib/validators'
import CardPreview from '../../components/Stash/Game/CardPreview.vue'

export default {
  components: {
    'v-select': vSelect,
    'game-card-preview': CardPreview
  },

  data() {
    return {
      form: {
        steam: true,
        title: '',
        deleted: false,
        steam_game_id: '',
        link: '',
        image: ''
      },
      platform: {
        options: [
          {
            id: 0,
            value: '',
            text: 'Where the game hosts?',
            disabled: true
          },
          {
            id: 1,
            value: true,
            text: 'Steam'
          },
          {
            id: 2,
            value: false,
            text: 'Non-Steam'
          }
        ]
      },
      options: [],
      select: ''
    }
  },

  validations: {
    form: {
      title: {
        required,
        minLength: minLength(2)
      },
      steam_game_id: {
        required: requiredIf(function() { return this.showSteamRelatedFields }),
        integer,
        minValue: minValue(0)
      },
      link: {
        url
      },
      image: {
        url
      }
    }
  },

  computed: {
    showSteamRelatedFields() {
      return this.form.steam && !this.form.deleted
    },

    imageUrl() {
      if (this.$v.form.image.$invalid) {
        return null
      }
      if(this.form.image) {
        const http = new XMLHttpRequest()
        http.open('HEAD', this.form.image, false)
        http.send()
        return http.status === 404 ? null : this.form.image
      }
      return null
    }
  },

  watch: {
    'form.steam_game_id': function(value) {
      this.form.link = value ? `https://store.steampowered.com/app/${value}` : ''
      this.form.image = value ? `https://steamcdn-a.akamaihd.net/steam/apps/${value}/header.jpg` : ''
    }
  },

  methods: {
    ...mapActions([
      'addGame'
    ]),
    onSubmit() {
      const payload = Object.assign({}, this.form)
      if (payload.steam && payload.deleted) {
        delete payload.link
        delete payload.steam_game_id
      }
      if (!payload.steam) {
        delete payload.steam_game_id
      }
      // console.log(payload)
      this.addGame(payload)
        .then(() => {
          this.$router.push({ name: 'keys' })
          this.$notify({
            type: 'success',
            title: 'Adding game',
            text: `Game ${payload.title} was successfully added to your stash`
          })
        })
        .catch((error) => {
          this.$notify({
            type: 'error',
            title: 'Adding game',
            text: error.response.data.errors[Object.keys(error.response.data.errors)[0]][0]
          })
        })
    },

    onSearch: debounce(function(search) {
      axios.get(`/api/games/search?q=${search}`)
        .then((response) => {
          this.options = response.data.games
        })
        .catch((error) => {
          console.log(error)
        })
    }, 300),

    optionChosen() {
      this.form.steam_game_id = this.select.appid || ''
      this.form.title = this.select.name || ''
    }
  }
}
</script>

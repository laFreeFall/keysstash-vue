<template>
  <b-card header-tag="header">
    <h4 slot="header" class="text-center">
      Keys stash
      <b-badge v-if="stashLoaded" :variant="keysAmount > 0 ? 'info' : 'secondary'">
        {{ keysAmount }}
      </b-badge>
    </h4>
    <b-row v-if="!stashLoaded">
      <b-col cols="4" v-for="i in 6" :key="i">
        <game-card-loader :keys="3"></game-card-loader>
      </b-col>
    </b-row>
    <div v-else>
      <div class="d-flex justify-content-around mb-2">
      <b-form-group>
        <b-form-radio-group
          buttons
          button-variant="outline-info"
          v-model="filters.keys.selected"
          :options="filters.keys.options"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-group>
        <b-form-radio-group
          buttons
          button-variant="outline-info"
          v-model="filters.platforms.selected"
          :options="filters.platforms.options"
        ></b-form-radio-group>
      </b-form-group>
      <b-form-select
        v-model="filters.sort.selected"
        :options="filters.sort.options"
        class="col-3"
      >
      </b-form-select>
    </div>
      <template v-if="filteredStash.length">
      <b-card-group columns>
        <game-card
          v-for="game in filteredStash"
          :key="game.id"
          :game="game"
        >
        </game-card>
      </b-card-group>
    </template>
      <template v-else>
      <b-alert :show="searchFilter.length" variant="warning" class="text-center">
        There are no games by your request <strong>{{ searchFilter }}</strong>
        <br>
        Consider
        <b-link :to="{ name: 'games.create' }">adding a new game</b-link>
        if you want to add id to the stash and manage its keys.
      </b-alert>
      <b-alert :show="!searchFilter.length" varian="info" class="text-center">
        You haven't stored keys in your stash yet.
        <b-link :to="{ name: 'games.create' }">Add games</b-link>
        to start managing your virtual stash.
      </b-alert>
    </template>
    </div>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { denormalize } from 'normalizr'
import { stashSchema } from '@/store/schemas/stash'
import GameCard from '@/components/Stash/Games/Card.vue'
import GameCardLoader from '@/loaders/GameCard.vue'

export default {
  components: {
    GameCard,
    GameCardLoader
  },

  data() {
    return {
      filters: {
        keys: {
          options: [
            {
              id: 0,
              text: 'Keys',
              value: '',
              disabled: true
            },
            {
              id: 1,
              text: 'New',
              value: 'new'
            },
            {
              id: 2,
              text: 'Used',
              value: 'used'
            },
            {
              id: 3,
              text: 'All',
              value: 'all'
            }
          ],
          title: 'keys',
          selected: 'all',
          default: 'all'
        },
        platforms: {
          options: [
            {
              id: 0,
              text: 'Platform',
              value: '',
              disabled: true
            },
            {
              id: 1,
              text: 'Steam',
              value: 'steam'
            },
            {
              id: 2,
              text: 'Non-Steam',
              value: 'non-steam'
            },
            {
              id: 3,
              text: 'All',
              value: 'all'
            }
          ],
          title: 'platforms',
          selected: 'all',
          default: 'all'
        },
        sort: {
          options: [
            {
              id: 1,
              text: '↑ Keys amount (asc)',
              value: 'amount-asc'
            },
            {
              id: 1,
              text: '↓ Keys amount (desc)',
              value: 'amount-desc'
            },
            {
              id: 1,
              text: '↑ Game title (asc)',
              value: 'title-asc'
            },
            {
              id: 1,
              text: '↓ Game title (desc)',
              value: 'title-desc'
            },
            {
              id: 1,
              text: '↑ Date added (asc)',
              value: 'date-asc'
            },
            {
              id: 1,
              text: '↓ Date added (desc)',
              value: 'date-desc'
            }
          ],
          title: 'sort',
          selected: 'amount-desc',
          default: 'amount-desc'
        }
      },
      keysAmount: ''
    }
  },

  computed: {
    ...mapGetters([
      'stash',
      'stashLoaded',
      'searchFilter'
    ]),
    filteredStash() {
      const filteringStash = {
        result: [],
        entities: {
          games: {},
          keys: {}
        }
      }

      let result = []
      // filtering games depending on search request
      if (this.searchFilter) {
        this.stash.result.forEach((gameId) => {
          const gameTitle = this.stash.entities.games[gameId].title.toLowerCase()
          if (gameTitle.includes(this.searchFilter)) {
            result.push(gameId)
          }
        })
      } else {
        result = this.stash.result.slice()
      }

      // filtering games depending on select - steam or not
      switch (this.filters.platforms.selected.trim()) {
        case 'all':
          filteringStash.result = result
          result.forEach((gameId) => {
            filteringStash.entities.games[gameId] = Object.assign({}, this.stash.entities.games[gameId])
          })
          break
        case 'steam':
          result.forEach((gameId) => {
            // if (this.stash.entities.games[gameId].steam) {
            filteringStash.result.push(gameId)
            filteringStash.entities.games[gameId] = Object.assign({}, this.stash.entities.games[gameId])
            // }
          })
          break
        case 'non-steam':
          result.forEach((gameId) => {
            // if (!this.stash.entities.games[gameId].steam) {
            filteringStash.result.push(gameId)
            filteringStash.entities.games[gameId] = Object.assign({}, this.stash.entities.games[gameId])
            // }
          })
          break
        default:
          filteringStash.result = result
          result.forEach((gameId) => {
            filteringStash.entities.games[gameId] = Object.assign({}, this.stash.entities.games[gameId])
          })
      }

      // filtering keys depending on select - used or not
      filteringStash.result.forEach((gameId) => {
        const tempKeysIds = []
        if (this.stash.entities.games[gameId].keys.length) {
          this.stash.entities.games[gameId].keys.forEach((keyId) => {
            const usedString = this.stash.entities.keys[keyId].used ? 'used' : 'new'
            if (this.filters.keys.selected === 'all' || usedString === this.filters.keys.selected) {
              filteringStash.entities.keys[keyId] = Object.assign({}, this.stash.entities.keys[keyId])
              tempKeysIds.push(keyId)
              filteringStash.entities.games[gameId].keys = tempKeysIds
            }
          })
        }
        filteringStash.entities.games[gameId].keys = tempKeysIds
      })

      switch (this.filters.sort.selected) {
        case 'title-asc':
          filteringStash.result.sort((a, b) =>
            filteringStash.entities.games[a].title.localeCompare(filteringStash.entities.games[b].title))
          break
        case 'title-desc':
          filteringStash.result.sort((a, b) =>
            filteringStash.entities.games[b].title.localeCompare(filteringStash.entities.games[a].title))
          break
        case 'amount-asc':
          filteringStash.result.sort((a, b) =>
            filteringStash.entities.games[a].keys.length - filteringStash.entities.games[b].keys.length)
          break
        case 'amount-desc':
          filteringStash.result.sort((a, b) =>
            filteringStash.entities.games[b].keys.length - filteringStash.entities.games[a].keys.length)
          break
        case 'date-asc':
          filteringStash.result.sort((a, b) =>
            filteringStash.entities.games[a].id - filteringStash.entities.games[b].id)
          break
        case 'date-desc':
          filteringStash.result.sort((a, b) =>
            filteringStash.entities.games[b].id - filteringStash.entities.games[a].id)
          break
        default:
          filteringStash.result.sort((a, b) =>
            filteringStash.entities.games[a].id - filteringStash.entities.games[b].id)
      }
      this.updateKeysAmount(Object.keys(filteringStash.entities.keys).length)

      return denormalize(filteringStash.result, stashSchema, filteringStash.entities)
    }
  },

  methods: {
    updateKeysAmount(value) {
      this.keysAmount = value
    }
  }
}
</script>

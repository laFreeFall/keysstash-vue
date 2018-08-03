<template>
  <b-card header-tag="header" v-if="stashLoaded">
    <h4 slot="header" class="text-center">
      Keys stash
    </h4>
    <template v-if="filteredStash.length">
      <b-card-group columns>
        <app-game-card
          v-for="game in filteredStash"
          :key="game.id"
          :game="game"
        >
        </app-game-card>
      </b-card-group>
    </template>
    <template v-else>
      <b-alert :show="searchFilter.length" variant="warning" class="text-center">
        There are no games by your request <strong>{{ searchFilter }}</strong>
      </b-alert>
      <b-alert :show="!searchFilter.length" varian="info" class="text-center">
        You haven't stored keys in your stash yet.
      </b-alert>
    </template>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { denormalize } from 'normalizr'
import { stashSchema } from './../../store/schemas/stash'
import GameCard from './../../components/Stash/GameCard.vue'

export default {
  components: {
    'app-game-card': GameCard
  },
  computed: {
    ...mapGetters([
      'stash',
      'stashLoaded',
      'userLogged',
      'searchFilter'
    ]),
    filteredStash() {
      let filteringStash = {
        result: [],
        entities: {
          games: {},
          keys: {}
        }
      }

      // Filtering games by Search Query (text input)
      if (this.searchFilter) {
        this.stash.result.forEach((id) => {
          const gameTitle = this.stash.entities.games[id].title.toLowerCase()
          if (gameTitle.includes(this.searchFilter)) {
            filteringStash.entities.games[id] = Object.assign({}, this.stash.entities.games[id])
            filteringStash.result.push(id)
          }
        })
      } else {
        filteringStash = Object.assign({}, this.stash)
      }
      filteringStash.entities.keys = Object.assign({}, this.stash.entities.keys)
      return denormalize(filteringStash.result, stashSchema, filteringStash.entities)
    }
  }
}
</script>

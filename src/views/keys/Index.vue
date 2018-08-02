<template>
  <b-card header-tag="header" v-if="stashLoaded">
    <h4 slot="header" class="text-center">
      Keys stash
    </h4>
    Filter value: {{ searchFilter }}
    <b-card-group columns>
      <b-card
        v-for="game in filteredStash"
        :key="game.id"
        header-tag="header"
      >
        <div slot="header" class="text-center">
            {{ game.title }}
        </div>
        <b-list-group>
          <b-list-group-item
            v-for="key in game.keys"
            :key="key.id"
            class="text-center"
          >
            {{ key.body }}
          </b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import { denormalize } from 'normalizr'
import { stashSchema } from './../../store/schemas/stash'

export default {
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

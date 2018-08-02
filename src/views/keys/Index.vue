<template>
  <div class="about">
    <b-card header-tag="header">
      <h4 slot="header" class="text-center">
        Keys stash
      </h4>
      <b-card-group columns>
        <b-card
          v-for="game in games"
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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { denormalize } from 'normalizr'
import { stashSchema } from './../../store/schemas/stash'

export default {
  computed: {
    ...mapGetters([
      'stash'
    ]),
    games() {
      return denormalize(this.stash.result, stashSchema, this.stash.entities)
    }
  }
}
</script>

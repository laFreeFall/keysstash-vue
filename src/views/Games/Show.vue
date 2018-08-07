<template>
  <b-card header-tag="header">
    <h4 slot="header" class="text-center">
      Keys stash
    </h4>
    <b-row align-h="center">
      <b-col cols="8">
        <div v-if="!stashLoaded">
          <game-card-loader :keys="5"></game-card-loader>
        </div>
        <div v-else>
          <game-card
            :game="game(id)"
            :single="true"
          >
          </game-card>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import GameCard from '@/components/Stash/Games/Card.vue'
import GameCardLoader from '@/loaders/GameCard.vue'

export default {
  components: {
    GameCard,
    GameCardLoader
  },

  props: ['id'],

  computed: {
    ...mapGetters([
      'game',
      'stashLoaded',
      'stashGame'
    ])
  }
}
</script>

<template>
  <b-card header-tag="header">
    <h4 slot="header" class="text-center">
      Keys stash
    </h4>
    <div class="loading" v-if="!stashLoaded">
      data is loading...
    </div>
    <b-row align-h="center" v-else>
      <b-col cols="8">
        <app-game-card
          :game="game(id)"
          :single="true"
        >
        </app-game-card>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { mapGetters } from 'vuex'
import GameCard from '../../components/Stash/Games/Card.vue'

export default {
  components: {
    'app-game-card': GameCard
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

<template>
  <b-card
    :border-variant="game.keys.length ? 'info' : ''"
    :header-bg-variant="game.keys.length ? 'info' : 'light'"
    :header-text-variant="game.keys.length ? 'white' : ''"
    header-tag="header"
  >
    <div slot="header" class="text-center">
      {{ game.title }}
    </div>
    <b-list-group>
      <app-game-key
        v-for="key in game.keys"
        :key="key.id"
        :gameKey="key"
      >
      </app-game-key>
    </b-list-group>
  </b-card>
</template>

<script>
import GameKey from './GameKey.vue'

export default {
  components: {
    'app-game-key': GameKey
  },

  props: {
    game: {
      type: Object,
      required: true
    }
  }
}
</script>

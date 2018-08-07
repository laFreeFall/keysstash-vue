<template>
  <b-card
    :border-variant="game.keys.length ? 'info' : ''"
    :header-bg-variant="game.keys.length ? 'info' : 'light'"
    :header-text-variant="game.keys.length ? 'white' : ''"
    :img-src="game.image"
    :img-alt="game.title"
    header-tag="header"
    class="game-card"
    :class="{ 'game-card-empty': game.keys.length === 0 }"
  >
    <div slot="header" class="text-center">
      <a
        v-if="game.steam && game.link"
        :href="game.link"
        :class="game.keys.length ? 'text-white' : 'text-dark'"
        target="_blank"
        title="Open game store page"
        v-b-tooltip.hover
      >
        <icon
          v-if="game.steam"
          name="brands/steam"
          scale="1.1"
        >
        </icon>
      </a>
      <icon
        v-if="game.steam && !game.link"
        name="brands/steam"
        scale="1.1"
      >
      </icon>
      &nbsp;
      <router-link
        v-if="!single"
        :to="{
          name: 'games.show',
          params: {
            id: game.id
          }
        }"
        :class="game.keys.length ? 'text-white' : 'text-dark'"
      >{{ game.title }}</router-link>
      <span v-else>
        {{ game.title }}
      </span>
      &nbsp;
      <b-badge v-show="game.keys.length" variant="light">
        {{ game.keys.length}}
      </b-badge>
    </div>
    <b-list-group v-show="game.keys.length">
      <template v-for="(key, index) in game.keys">
        <b-list-group-item
          v-if="index === displayKeysAtOnce && !single"
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
    <b-alert :show="!game.keys.length" variant="light" class="mb-0 pt-0 text-center">
      There are no keys for this game...
    </b-alert>
    <app-add-key :game="game"></app-add-key>
  </b-card>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/brands/steam'
import 'vue-awesome/icons/toggle-on'
import 'vue-awesome/icons/toggle-off'
import 'vue-awesome/icons/caret-up'
import 'vue-awesome/icons/caret-down'
import isUrl from 'is-url'
import Key from '@/components/Stash/Keys/Show.vue'
import AddKey from '@/components/Stash/Keys/Create.vue'

export default {
  components: {
    'app-game-key': Key,
    'app-add-key': AddKey,
    Icon
  },

  props: {
    game: {
      type: Object,
      required: true
    },
    single: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      displayKeysAtOnce: 3,
      showHiddenKeys: false
    }
  },

  computed: {
    hiddenKeysAmount() {
      return this.game.keys.length - this.displayKeysAtOnce
    },

    hasHiddenKeys() {
      return this.hiddenKeysAmount > 0
    }
  },

  methods: {
    isKeyShown(index) {
      if (this.single) {
        return true
      }
      if (index < this.displayKeysAtOnce) {
        return true
      }
      return this.showHiddenKeys
    }
  }
}
</script>

<style>
.game-card.game-card-empty .card-img {
  filter: grayscale(100%);
}
</style>

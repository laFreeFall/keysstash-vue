<template>
  <div class="about">
    <b-card header-tag="header">
      <h4 slot="header" class="text-center">
        Keys stash
      </h4>
      <b-card-group columns>
        <b-card
          v-for="game in stash"
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

  export default {
    computed: {
      ...mapGetters([
        'stash'
      ])
    }
  }
</script>

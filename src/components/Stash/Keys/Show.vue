<template>
    <b-list-group-item class="text-center d-flex justify-content-between" v-show="shown">
      <b-button
        size="sm"
        variant="outline-info"
        v-clipboard:copy="gameKey.body"
        @click="toggleKeyUse"
        :title="gameKey.used ? 'Check the key as brand new' : 'Check this key as used'"
        v-b-tooltip.hover
      >
        <icon :name="gameKey.used ? 'toggle-on' : 'toggle-off'"></icon>
      </b-button>
      <span>{{ gameKey.body }}</span>
      <b-button
        size="sm"
        variant="outline-info"
        v-clipboard:copy="gameKey.body"
        v-clipboard:success="onCopySuccess"
        v-clipboard:error="onCopyError"
        title="Copy the key to buffer"
        v-b-tooltip.hover
      >
        <icon name="copy"></icon>
      </b-button>
    </b-list-group-item>
</template>

<script>
import { mapActions } from 'vuex'
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/copy'
import 'vue-awesome/icons/toggle-on'
import 'vue-awesome/icons/toggle-off'

export default {
  components: {
    Icon
  },

  props: {
    gameKey: {
      type: Object,
      required: true
    },
    shown: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    ...mapActions([
      'toggleKeyUsedStatus'
    ]),

    onCopySuccess() {
      this.$notify({
        type: 'success',
        title: 'Key copying',
        text: `Key ${this.gameKey.body} was successfully copied to your buffer`
      })
    },

    onCopyError() {
      this.$notify({
        type: 'error',
        title: 'Key copying',
        text: 'Error has happened while copying the key. Please, try it again or do it manually.'
      })
    },

    toggleKeyUse() {
      const keyStatus = !this.gameKey.used ? 'used' : 'new'
      this.toggleKeyUsedStatus(this.gameKey)
        .then(() => {
          this.$notify({
            type: 'success',
            title: 'Using key',
            text: `Key ${this.gameKey.body} was successfully checked as ${keyStatus}.`
          })
        })
        .catch(() => {
          this.$notify({
            type: 'error',
            title: 'Using key',
            text: `Error has happened while checking key ${this.gameKey.body} as ${keyStatus}`
          })
        })
    }
  }
}
</script>

<template>
    <b-list-group-item class="text-center d-flex justify-content-between">
      <b-button
        size="sm"
        variant="outline-info"
        v-clipboard:copy="gameKey.body"
        v-clipboard:success="onCopySuccess"
        v-clipboard:error="onCopyError"
      >
        <icon name="copy"></icon>
      </b-button>
      {{ gameKey.body }}
      <b-button size="sm" variant="outline-info" v-clipboard:copy="gameKey.body">
        <icon name="copy"></icon>
      </b-button>
    </b-list-group-item>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/copy'

export default {
  props: {
    gameKey: {
      type: Object,
      required: true
    }
  },

  components: {
    Icon
  },

  methods: {
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
    }
  }
}
</script>

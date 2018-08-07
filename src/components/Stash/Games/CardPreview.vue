<template>
  <b-card
    header-bg-variant="light"
    :img-src="imageUrl"
    :img-alt="title"
    header-tag="header"
  >
    <div slot="header" class="text-center">
      <icon
        v-if="steam"
        name="brands/steam"
        scale="1.1"
      >
      </icon>
      {{ title }}
    </div>
    <b-alert show variant="light" class="text-center">
      There are no keys for this game at the moment.<br>
    </b-alert>
  </b-card>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue'
import 'vue-awesome/icons/brands/steam'
import isUrl from 'is-url'

export default {
  components: {
    Icon
  },

  props: {
    title: {
      required: true,
      type: String
    },
    steam: {
      required: true,
      type: Boolean
    },
    image: {
      type: String,
      default: 'https://www.mancinifoods.com/site/wp-content/uploads/2018/05/no-thumbnail.png'
    }
  },

  computed: {
    imageUrl() {
      const fallbackImage = 'https://www.mancinifoods.com/site/wp-content/uploads/2018/05/no-thumbnail.png'
      if (this.image) {
        const currentImage = this.image
        if (isUrl(this.image)) {
          const img = document.createElement('img')
          img.onload = () => currentImage
          img.onerror = () => fallbackImage
        }
      }
      return fallbackImage
    }
  }
}
</script>

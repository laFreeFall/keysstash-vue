<template>
  <content-loader :height="400">
    <rect x="0" y="0" rx="5" ry="5" width="400" height="160" />
    <rect x="0" y="165" rx="5" ry="5" width="400" height="50" />
    <template v-for="i in keys">
      <rect x="25" :y="i * 40 + 200" rx="5" ry="5" width="30" height="30" />
      <rect x="75" :y="i * 40 + 200" rx="5" ry="5" width="250" height="30" />
      <rect x="345" :y="i * 40 + 200" rx="5" ry="5" width="30" height="30" />
    </template>
  </content-loader>
</template>

<script>
  import { ContentLoader } from 'vue-content-loader'

  export default {
    components: {
      ContentLoader
    },
    props: {
      keys: {
        type: Number,
        default: 3
      }
    }
  }
</script>


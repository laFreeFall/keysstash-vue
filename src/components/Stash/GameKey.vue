<template>
    <b-list-group-item class="text-center">
      {{ gameKey.body }}
    </b-list-group-item>
</template>

<script>
export default {
  props: {
    gameKey: {
      type: Object,
      required: true
    }
  }
}
</script>

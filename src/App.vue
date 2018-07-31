<template>
  <div id="app">
    <app-header></app-header>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
  import Header from './components/Header'

  export default {
      components: {
          'app-header': Header
      }
  }
</script>
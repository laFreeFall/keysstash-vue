<template>
  <b-navbar toggleable="md" type="dark" variant="info" class="mb-3">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

    <b-navbar-brand :to="{ name: 'home' }">{{ projectName }}</b-navbar-brand>

    <b-collapse is-nav id="nav_collapse">

      <b-navbar-nav>
        <b-nav-item :to="{ name: 'keys' }">Keys</b-nav-item>
        <b-nav-item :to="{ name: 'addGame' }">Add Game</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Signout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  data() {
    return {
      projectName: 'KeysStash'
    }
  }
};
</script>


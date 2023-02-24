<template>
<nav class="side-menu">
  <v-card
      class="mx-auto side-menu"
      max-width="300"
      height="100vh"
      width="210px"
      justify="center"
  >
    <v-list density="compact">
      <v-list-item v-for="(item, i) of items" :key="i" :value="item" :href="item.link">

        <template v-slot:prepend>
          <v-icon :icon="item.icon"></v-icon>
        </template>

        <v-list-item-title v-text="item.title"></v-list-item-title>

      </v-list-item>
    </v-list>
  </v-card>
</nav>
</template>

<script setup>
  import { ref } from "vue"

  const items = ref([
    {
      title: 'Game',
      value: 1,
      icon: "mdi-gamepad-variant",
      link: "#/"
    },
    {
      title: 'Leaderboard',
      value: 2,
      icon: "mdi-trophy",
      link: "#/leaderboard"
    },
    {
      title: 'Contacts',
      value: 3,
      icon: "mdi-account-multiple",
      link: "#/contacts"
    },
  ])
</script>

<style scoped>
.side-menu {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
}
</style>
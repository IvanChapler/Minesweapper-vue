<template>
<nav class="side-menu">
  <v-card
      class="mx-auto side-menu"
      max-width="400"
      height="100vh"
      width="240px"
      justify="center"
  >
    <v-list density="compact" width="80%" style="margin: 0 auto">
      <v-list-item @click="activateItem(item)" v-for="(item, i) of items" :key="i" :value="item" :href="item.link" rounded="xl" style="width: 100%; margin: 10px 0" :active="item.active">

        <template v-slot:prepend>
          <v-icon :icon="item.icon" size="large"></v-icon>
        </template>

        <v-list-item-title v-text="item.title" style="font-size: 17px"></v-list-item-title>

      </v-list-item>
    </v-list>
  </v-card>
</nav>
</template>

<script setup>
import {onMounted, ref} from "vue"

  const items = ref([
    {
      title: 'Game',
      value: 1,
      icon: "mdi-gamepad-variant",
      link: "#/",
      active: (window.location.hash === "#/") ? true : false
    },
    {
      title: 'Leaderboard',
      value: 2,
      icon: "mdi-trophy",
      link: "#/leaderboard",
      active: (window.location.hash === "#/leaderboard") ? true : false
    },
    {
      title: 'Contacts',
      value: 3,
      icon: "mdi-account-multiple",
      link: "#/contacts",
      active: (window.location.hash === "#/contacts") ? true : false
    },
  ])

  function activateItem (selectedItem) {
    items.value.forEach(item => {
      if (selectedItem === item) {
        item.active = true
      } else {
        item.active = false
      }
    })
  }

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
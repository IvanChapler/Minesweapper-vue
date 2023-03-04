<script setup>
import { computed, ref } from "vue";
import AddHeader from "./components/AddHeader.vue";
import GameComponent from "./components/GameComponent.vue";
import LeaderboardComponent from "./components/LeaderboardComponent.vue";
import ContactsComponent from "./components/ContactsComponent.vue";
import NotFound from "./components/NotFoundComponent.vue";

const routes = {
  "/": GameComponent,
  "/leaderboard": LeaderboardComponent,
  "/contacts": ContactsComponent,
};

const currentPath = ref(window.location.hash);

window.addEventListener("hashchange", () => {
  currentPath.value = window.location.hash;
});

const currentRoute = computed(() => {
  return routes[currentPath.value.slice(1) || "/"] || NotFound;
});
</script>

<template>
  <v-container>
    <add-header />
  </v-container>

  <keep-alive include="GameComponent">
    <component :is="currentRoute" />
  </keep-alive>
</template>

<style scoped></style>

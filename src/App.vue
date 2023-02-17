<script setup>
import { onMounted, ref } from "vue";
import GmArena from "./components/GmArea.vue";

const sumCell = ref(0);


</script>

<template>
  <h1 class="">Hello in Minesweeper game!</h1>
  <h2>Выберите сложность</h2>

  <gm-arena/>
</template>

<style scoped>

</style>
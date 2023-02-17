<template>
  <div class="game-area_wrapper">
    <div v-for="cell of field" :key="cell" class="game-area_element">
      {{ cell }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import createField from "./gameAlgorhitm.js";

const field = ref([]);

onMounted(() => {
  field.value = createField(8);
});
</script>

<style scoped>
.game-area_wrapper {
  display: grid;
  grid-template-columns: repeat(8, 30px);
  grid-template-rows: repeat(8, 30px);
  gap: 1px;
}

.game-area_element {
  background: black;
  color: white
}
</style>
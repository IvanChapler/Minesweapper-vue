<template>
  <v-row justify="center" class="mt-16">
    <div :style="{ gridTemplateColumns: `repeat(${props.sumCell}, ${sizeCell}px)`, gridTemplateRows: `repeat(${props.sumCell}, ${sizeCell}px)` }" class="game-area_wrapper">
      <div v-for="cell of field" :key="cell" :style="{ fontSize: `${sizeNum}px` }" class="game-area_element">
        {{ cell }}
      </div>
    </div>
  </v-row>
</template>

<script setup>
import { ref, onMounted, computed, defineProps } from "vue";
import createField from "./gameAlgorhitm.js";

const field = ref([]);
const props = defineProps(['sumCell']);

const sizeCell = computed(() => {
  return props.sumCell !== 16 ? 400 / props.sumCell : 400 / props.sumCell * 2
})

const sizeNum = computed(() => {
  return props.sumCell !== 16 ? 160 / props.sumCell : 160 / props.sumCell * 2
})

onMounted(() => {
  field.value = createField(props.sumCell);
});
</script>

<style scoped>
.game-area_wrapper {
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(8, 50px);
  gap: 1px;
}

.game-area_element {
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
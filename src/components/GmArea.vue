<template>

  <v-row justify="center" class="mt-16">
    <div :style="{ gridTemplateColumns: `repeat(${props.sumCell}, ${sizeCell}px)`, gridTemplateRows: `60px repeat(${props.sumCell}, ${sizeCell}px)` }" class="game-area_wrapper">

      <div :style="{ gridColumnEnd: `${props.sumCell + 1}` }" class="statistics">
        <div class="statistics_element">
          <v-icon icon="mdi-timer-outline" size="x-large"></v-icon>
          <div class="statistics_text">10 min.</div>
        </div>
        <div class="statistics_element">
          <v-icon icon="mdi-bomb-off" size="large"></v-icon>
          <div class="statistics_text">6</div>
        </div>
        <div class="statistics_element">
          <v-icon icon="mdi-flag-triangle" size="large"></v-icon>
          <div class="statistics_text">10</div>
        </div>
      </div>

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

.statistics {
  height: 40px;
  grid-column-start: 1;
  align-self: end;
  justify-self: end;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.statistics_element {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.statistics_element:first-child {
  flex-grow: 1;
  margin-left: 0;
  font-size: 18px;
  align-items: start;
}

.statistics_element:first-child .statistics_text {
  font-size: 23px;
  font-weight: 600;
  line-height: 1.7;
  margin-left: 8px;
}

.statistics_text {
  margin-left: 5px;
  font-size: 20px;
}

</style>
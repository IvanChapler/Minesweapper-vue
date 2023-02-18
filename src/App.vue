<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import AddHeader from "./components/AddHeader.vue";
import GmArea from "./components/GmArea.vue"

const sumCell = ref(0);
const isGameStart = ref(false);
const timeAmount = ref(0);

function startGame (num) {
  sumCell.value = num
  isGameStart.value = true
}
</script>

<template>
  <v-container>
    <add-header/>

    <section v-if="!isGameStart">
      <div class="choice-interface_wrapper">
        <v-row justify="center">
          <h2 class="subtitle">Choose the difficulty:</h2>
        </v-row>

        <v-row class="mt-8">
          <v-btn @click="startGame(4), timeAmount = 10" rounded="pill" color="teal-lighten-1" class="choice-interface_element">Easy (4x4)</v-btn>
          <v-btn @click="startGame(8), timeAmount = 40" rounded="pill" color="orange-lighten-1" class="ml-4 mr-4 choice-interface_element">Medium (8x8)</v-btn>
          <v-btn @click="startGame(16), timeAmount = 100" rounded="pill" color="red-darken-2" class="choice-interface_element">Hard (16x16)</v-btn>
        </v-row>
      </div>
    </section>

    <gm-area v-if="isGameStart" :sumCell="sumCell" :timeAmount="timeAmount"/>
  </v-container>
</template>

<style scoped>
@import "../settings.scss";

.subtitle {
  text-transform: uppercase;
  font-size: 16px;
  font-weight: 200;
}
.choice-interface_wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.choice-interface_element {
  font-size: 13px;
}
</style>
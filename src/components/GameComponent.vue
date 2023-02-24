<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import AddHeader from "./AddHeader.vue";
import GmArea from "./GmArea.vue";
import RestartGameBtn from "./RestartGameBtn.vue";
import QuitGameBtn from "./QuitGameBtn.vue";
import GameOverOverlay from "./GameOverOverlay.vue"

const sumCell = ref(0);
const isGameStart = ref(false);
const isGameRestart = ref(true);
const timeAmount = ref(0);
const overlayVisible = ref(false);
const gameResult = ref('');
const inputHardDifference = ref('')
const validateRules = ref([function () { if(isNaN(+inputHardDifference.value)){return 'Введите число клеток по оси!'} else {return true} }]);

function defineLoseOrWin (result) {
  if (result === 'lose') {
    overlayVisible.value = true
    gameResult.value = 'You lose('
  }
  if (result === 'win') {
    overlayVisible.value = true
    gameResult.value = 'You won!!!'
  }
}

function startGame (num) {
  sumCell.value = num
  isGameStart.value = true
}

function restartGame () {
  isGameRestart.value = false
  setTimeout(() => isGameRestart.value = true, 0)
}

function quitGame () {
  isGameStart.value = false
}

</script>

<template>
  <v-container>

    <section v-if="!isGameStart">
      <div class="choice-interface_wrapper">
        <v-row justify="center">
          <h2 class="subtitle">Choose the difficulty:</h2>
        </v-row>

        <v-row class="mt-8">
          <v-btn @click="startGame(2), timeAmount = 10" rounded="pill" color="teal-lighten-1" class="choice-interface_element">Easy (4x4)</v-btn>
          <v-btn @click="startGame(8), timeAmount = 40" rounded="pill" color="orange-lighten-1" class="ml-4 mr-4 choice-interface_element">Medium (8x8)</v-btn>
          <v-btn @click="startGame(16), timeAmount = 100" rounded="pill" color="red-darken-2" class="choice-interface_element">Hard (16x16)</v-btn>
        </v-row>
        <v-row justify="center" class="mt-5">or</v-row>
        <v-row justify="center" class="mt-5">
          <v-text-field @keydown.enter="startGame(+inputHardDifference)" v-model="inputHardDifference" label="Your size" :rules="validateRules">
          </v-text-field>
        </v-row>
      </div>
    </section>

    <div class="btn-restart-quit-size_wrapper">
      <restart-game-btn @click="restartGame" v-if="isGameStart"/>
      <quit-game-btn @click="quitGame" v-if="isGameStart"/>
    </div>

    <div v-if="isGameStart">
      <gm-area v-if="isGameRestart" @result-game="defineLoseOrWin" :sumCell="sumCell" :timeAmount="timeAmount">
        <template v-slot:overlay>
          <game-over-overlay v-if="overlayVisible" :result="gameResult">
            <restart-game-btn @click="restartGame(), overlayVisible = false"/>
            <quit-game-btn @click="quitGame(), overlayVisible = false"/>
          </game-over-overlay>
        </template>
      </gm-area>
    </div>
  </v-container>
</template>

<style scoped>
@import "../../settings.scss";

.btn-restart-quit-size_wrapper {
  position: absolute;
  top: 107px;
  display: flex;
  flex-direction: column;
}
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
<script setup>
import { onMounted, ref } from "vue";
import GmArea from "./GmArea.vue";
import RestartGameBtn from "./RestartGameBtn.vue";
import QuitGameBtn from "./QuitGameBtn.vue";
import GameOverOverlay from "./GameOverOverlay.vue";

const sumCell = ref(0);
const isGameStart = ref(false);
const isGameRestart = ref(true);
const timeAmount = ref(0);
const overlayVisible = ref(false);
const gameResult = ref("");
const username = ref("");
const validateRules = ref();

function defineLoseOrWin(result) {
  if (result === "lose") {
    overlayVisible.value = true;
    gameResult.value = "You lose(";
  }
  if (result === "win") {
    overlayVisible.value = true;
    gameResult.value = "You won!!!";
  }
}

function startGame(num) {
  sumCell.value = num;
  isGameStart.value = true;

  window.localStorage.setItem(
    "selected-username",
    JSON.stringify(username.value)
  );
}

function restartGame() {
  isGameRestart.value = false;
  setTimeout(() => (isGameRestart.value = true), 0);
}

function quitGame() {
  isGameStart.value = false;
}

onMounted(() => {
  const dataSelectedUsername = window.localStorage.getItem("selected-username");

  if (dataSelectedUsername) {
    username.value = JSON.parse(dataSelectedUsername);
  }
});
</script>

<template>
  <v-container>
    <section v-if="!isGameStart">
      <div class="choice-interface_wrapper">
        <h2 class="subtitle">Choose the difficulty:</h2>

        <v-row class="mt-8 choice-interface_buttons" justify="center">
          <v-btn
            rounded="pill"
            color="teal-lighten-1"
            class="choice-interface_element"
            @click="startGame(4), (timeAmount = 10)"
            >Easy (4x4)</v-btn
          >
          <v-btn
            rounded="pill"
            color="orange-lighten-1"
            class="ml-4 mr-4 choice-interface_element"
            @click="startGame(8), (timeAmount = 40)"
            >Medium (8x8)</v-btn
          >
          <v-btn
            rounded="pill"
            color="red-darken-2"
            class="choice-interface_element"
            @click="startGame(16), (timeAmount = 100)"
            >Hard (16x16)</v-btn
          >
        </v-row>
        <v-row justify="center" class="mt-5 choice-interface_and">and</v-row>
        <v-row justify="center" class="mt-5 choice-interface_nickname">
          <v-text-field
            v-model="username"
            label="Select nick"
            :rules="validateRules"
          >
          </v-text-field>
        </v-row>
      </div>
    </section>

    <div class="btn-restart-quit-size_wrapper">
      <restart-game-btn v-if="isGameStart" @click="restartGame" />
      <quit-game-btn v-if="isGameStart" @click="quitGame" />
    </div>

    <div v-if="isGameStart">
      <gm-area
        v-if="isGameRestart"
        :sum-cell="sumCell"
        :time-amount="timeAmount"
        :user-name="username"
        @result-game="defineLoseOrWin"
      >
        <template #overlay>
          <game-over-overlay v-if="overlayVisible" :result="gameResult">
            <restart-game-btn
              @click="restartGame(), (overlayVisible = false)"
            />
            <quit-game-btn @click="quitGame(), (overlayVisible = false)" />
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
  text-align: center;
  margin: 0 auto;
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

@media screen and (max-width: 540px) {
  .choice-interface_element:not(:first-child) {
    font-size: 13px;
    margin-top: 20px;
    font-size: 12px;
  }
  .subtitle {
    font-size: 15px;
    order: 1;
    margin-top: 20px;
    width: 200px;
  }
  .choice-interface_wrapper {
    display: flex;
    flex-direction: column-reverse;
  }
  .choice-interface_nickname {
    order: 2;
  }
  .choice-interface_and {
    display: none;
  }
}
</style>

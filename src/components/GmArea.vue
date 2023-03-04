<template>
  <v-row justify="center" class="mt-16 base_wrapper">
    <div
      :style="{
        gridTemplateColumns: `repeat(${fieldSideX}, ${sizeCell}px)`,
        gridTemplateRows: `60px repeat(${sumCell}, ${sizeCell}px)`,
        gridAutoRows: `${sizeCell}px`,
      }"
      class="game-area_wrapper"
    >
      <slot name="overlay"></slot>

      <div :style="{ gridColumnEnd: `${fieldSideX + 1}` }" class="statistics">
        <add-timer
          :time-amount="props.timeAmount"
          class="statistics_element"
          style="margin-left: 0"
          @add-time="calculateTime"
        />
        <div class="statistics_element">
          <v-icon icon="mdi-bomb" size="large"></v-icon>
          <div class="statistics_text">{{ sumCell }}</div>
        </div>
        <div class="statistics_element">
          <v-icon icon="mdi-flag-triangle" size="large"></v-icon>
          <div class="statistics_text">{{ flags }}</div>
        </div>
      </div>

      <div
        v-for="(cell, i) of field"
        :key="i"
        :style="{ fontSize: `${sizeNum}px` }"
        :class="{
          'bg-cyan-accent-3': cell === 1 && mask[i] === maskStates.transparent,
          'bg-green-accent-3': cell === 2 && mask[i] === maskStates.transparent,
          'bg-red-lighten-1': cell === 3 && mask[i] === maskStates.transparent,
          'bg-indigo-darken-4':
            cell === 4 && mask[i] === maskStates.transparent,
          'bg-brown-lighten-1':
            cell === 5 && mask[i] === maskStates.transparent,
          'bg-teal-accent-4': cell === 6 && mask[i] === maskStates.transparent,
          'bg-grey-darken-3': cell === 7 && mask[i] === maskStates.transparent,
          'bg-white': cell === 8 && mask[i] === maskStates.transparent,
        }"
        class="game-area_element"
        @touchstart="startOpen(i, $event)"
        @touchend="endOpen(i, $event)"
        @click="loadField(i), openCell(i, $event)"
        @click.right="setFlag(i, $event)"
      >
        <div v-if="mask[i] === maskStates.transparent">
          <v-icon v-if="field[i] === Bomb">
            {{ Bomb }}
          </v-icon>
          <div v-else>
            {{ cell }}
          </div>
        </div>
        <div v-else>
          <v-icon v-if="mask[i] === maskStates.flag">
            {{ mask[i] }}
          </v-icon>
          <v-icon v-else-if="mask[i] === maskStates.question">
            {{ mask[i] }}
          </v-icon>
          <div v-else>
            {{ mask[i] }}
          </div>
        </div>
      </div>
    </div>
  </v-row>
</template>

<script setup>
import {
  ref,
  onMounted,
  computed,
  defineProps,
  defineEmits,
  reactive,
} from "vue";
import { createField, Bomb } from "./gameAlgorhitm.js";
import AddTimer from "./AddTimer.vue";
import { useStore } from "vuex";
import { useDisplay } from "vuetify";

const props = defineProps({
  sumCell: { type: Number, default: undefined },
  timeAmount: { type: Number, default: undefined },
  userName: { type: String, default: 'you' },
});
const emit = defineEmits(["resultGame"]);
const isFirstOpenedField = ref(true);
const flags = ref(props.sumCell);
const time = ref(0);
const mask = ref([]);
const store = useStore();
const { mobile } = useDisplay();
const touchesLength = ref(-1);
const maskStates = reactive({
  transparent: "",
  fill: " ",
  flag: "mdi-flag-triangle",
  question: "mdi-help",
});

const fieldSideX = computed(() => {
  return !mobile.value ? props.sumCell : props.sumCell === 4 ? 3 : 6;
});
const fieldSideY = computed(() => {
  return !mobile.value
    ? props.sumCell
    : Math.ceil(Math.pow(props.sumCell, 2) / fieldSideX.value);
});

const field = ref(new Array(fieldSideX.value * fieldSideY.value));

//Для мобилок. Долгое нажатие === ставить флаг, быстрое < 200мс === открывать клетку. Также есть условия в самих методах
let isEndTap = false;
function startOpen(i, event) {
  touchesLength.value = event.touches.length;
  isEndTap = false;

  setTimeout(() => {
    isEndTap = true;
  }, 200);
}

function endOpen(i, event) {
  if (isEndTap && touchesLength.value <= 1 && !isScroll) {
    setFlag(i, event);
  } else {
    openCell(i);
  }
}

let timer;
let isScroll;
document.addEventListener(
  "scroll",
  () => {
    if (timer !== null) {
      isScroll = true;
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      isScroll = false;
    }, 150);
  },
  false
);
//----

function calculateScore() {
  return 10 * time.value;
}

function calculateTime(emitValue) {
  time.value = emitValue;

  if (emitValue === 0) lose();
}

function loadField(i) {
  if (isFirstOpenedField.value === false) return;

  flags.value = props.sumCell;

  const dataField = createField(
    props.sumCell,
    fieldSideX.value,
    fieldSideY.value,
    i
  );
  field.value = dataField.field;
  mask.value = dataField.mask;

  isFirstOpenedField.value = false;
}

function lose() {
  field.value.forEach((cell, index) => {
    if (cell === Bomb) {
      mask.value[index] = maskStates.transparent;
    }
  });

  emit("resultGame", "lose");
}

function win() {
  emit("resultGame", "win");

  store.commit("increaseScore", {
    username: props.userName ? props.userName : "You",
    score: calculateScore(),
  });
  store.commit("addScoreToLocalStorage");
}

function checkWin() {
  let countOpenCell = 0;
  let sumAllCell = Math.pow(props.sumCell, 2);
  let sumBomb = props.sumCell;
  let sumNormalCell = sumAllCell - sumBomb;

  mask.value.forEach((cell) => {
    if (cell === maskStates.transparent) countOpenCell++;
  });

  if (countOpenCell === sumNormalCell && flags.value === 0) {
    win();
  }
}

function setFlag(i, event) {
  if (mobile.value && !isEndTap) return;
  if (event.cancelable) event.preventDefault();
  event.stopPropagation();

  if (mask.value[i] === maskStates.transparent) return;

  if (mask.value[i] === maskStates.question) {
    mask.value[i] = maskStates.fill;
  } else if (mask.value[i] === maskStates.flag) {
    mask.value[i] = maskStates.question;
    flags.value++;
  } else if (flags.value !== 0) {
    mask.value[i] = maskStates.flag;
    flags.value--;
  }

  checkWin();
}

function openCell(i) {
  if (mobile.value && isEndTap) return;

  const fieldSide = fieldSideX.value;

  const mnojitel = Math.floor(i / fieldSide);

  const cleared = [];

  let x = i;

  for (let i = 0; i < mnojitel; i++) {
    x -= fieldSide;
  }

  let y = x !== 0 ? Math.ceil(i / fieldSide) - 1 : Math.ceil(i / fieldSide);

  if (mask[y * fieldSide + x] === maskStates.transparent) return;

  checkBomb();
  clear(x, y);

  while (cleared.length) {
    let [x1, y1] = cleared.pop();

    mask.value[y1 * fieldSide + x1] = maskStates.transparent;

    if (field.value[y1 * fieldSide + x1] !== 0) continue;

    clear(x1 + 1, y1);
    clear(x1 - 1, y1);
    clear(x1, y1 + 1);
    clear(x1, y1 - 1);
  }

  function clear(x, y) {
    if (x >= 0 && x < fieldSide && y >= 0 && y < fieldSideY.value) {
      if (mask.value[y * fieldSide + x] === maskStates.transparent) return;
      if (mask.value[y * fieldSide + x] === maskStates.flag) return;

      cleared.push([x, y]);
    }
  }

  function checkBomb() {
    if (field.value[y * fieldSide + x] !== Bomb) return;
    else lose();
  }

  checkWin();
}

const sizeCell = computed(() => {
  return props.sumCell >= 16
    ? props.sumCell >= 32
      ? (400 / props.sumCell) * 3
      : (400 / props.sumCell) * 2
    : 400 / props.sumCell;
});

const sizeNum = computed(() => {
  return props.sumCell >= 16
    ? props.sumCell >= 16
      ? (160 / props.sumCell) * 3
      : (160 / props.sumCell) * 2
    : 160 / props.sumCell;
});

onMounted(() => {});
</script>

<style scoped>
.game-area_wrapper {
  display: grid;
  gap: 2px;
  position: relative;
}

.game-area_element {
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  -webkit-touch-callout: none; /* Safari */
  -webkit-user-select: none; /* Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.statistics {
  height: 45px;
  grid-column-start: 1;
  align-self: end;
  justify-self: end;
  width: 100%;
  display: flex;
  justify-content: space-between;
  -webkit-touch-callout: none; /* Safari */
  -webkit-user-select: none; /* Chrome */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
}

.statistics_element {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.statistics_text {
  margin-left: 5px;
  font-size: 20px;
}

@media screen and (max-width: 540px) {
  .statistics {
    justify-content: end;
  }
  .game-area_wrapper {
    grid-auto-rows: 50px;
    grid-auto-flow: row;
  }
}
</style>

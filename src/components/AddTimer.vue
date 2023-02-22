<template>
  <div class="statistics_element">
    <v-icon icon="mdi-timer-outline" size="x-large"></v-icon>
    <div class="statistics_text">{{ time }} min.</div>
  </div>
</template>

<script setup>
import {onMounted, ref, defineProps, defineEmits} from "vue";

const time = ref(0)
const props = defineProps(['timeAmount'])
const emit = defineEmits(['addTime'])

function emitFunction (value) {
  emit('addTime', value)
}

onMounted(() => {
  time.value = props.timeAmount

  const timerId = setInterval(() => {
    time.value -= 1

    emitFunction(time.value)

    if (+time.value === 0) clearInterval(timerId)
  }, 60000)
})
</script>

<style scoped>
.statistics_text {
  font-size: 22px;
  font-weight: 600;
  line-height: 1.7;
  margin-left: 8px;
}

.statistics_element {
  flex-grow: 1;
  font-size: 18px;
  align-items: start;
}
</style>
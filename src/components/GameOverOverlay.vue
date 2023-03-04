<template>
  <div class="overlay">
    <div class="overlay_modal">
      {{ props.result }}
    </div>
    <div class="btns">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  result: { type: String, default: undefined}
});
</script>

<style scoped>
.btns {
  display: flex;
  width: 130px;
  justify-content: space-between;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(69, 68, 68, 0.53);
  z-index: 9;
}
.overlay_modal {
  width: 250px;
  min-height: 70px;
  background: #181818;
  border-radius: 10px;
  border: 2px solid #535353;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: 600;
  text-transform: uppercase;
}
</style>

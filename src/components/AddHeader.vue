<template>
  <side-menu v-show="menuShow" @click.stop />
  <header>
    <v-row align="end" class="side-menu">
      <v-col cols="1">
        <!--hamburger-->
        <v-btn
          size="x-small"
          class="text-none hamburger"
          stacked
          @click.stop="menuShow = true"
        >
          <v-icon icon="mdi-menu" size="x-large" />
        </v-btn>
      </v-col>

      <v-col cols="10">
        <h1 class="title">
          Mine<span style="color: fuchsia">s</span>w<span style="color: orange"
            >e</span
          >epe<span style="color: orangered">r</span> game!
        </h1>
      </v-col>
    </v-row>
  </header>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import SideMenu from "./SideMenu.vue";

const menuShow = ref(false);

function onCloseMenu() {
  if (menuShow.value === true) menuShow.value = false;
}

onMounted(() => {
  document.addEventListener("click", onCloseMenu);
});
onUnmounted(() => {
  document.removeEventListener("click", onCloseMenu);
});
</script>

<style scoped>
.title {
  line-height: 1;
  text-align: center;
}
.side-menu {
  height: 115px;
}
@media screen and (max-width: 540px) {
  .title {
    font-size: 28px;
    width: 230px;
    margin: 0 auto;
  }
  .hamburger {
  }
}
</style>

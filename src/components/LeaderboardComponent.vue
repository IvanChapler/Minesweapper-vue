<template>
<v-container>
  <v-row justify="center" style="margin-top: 110px">
    <v-table style="width: 500px">
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-center pl-0 pr-10">
          Score
        </th>
        <th class="text-left">
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(user, i) of leaderboard" :key="i">
        <td>{{ user.username }}</td>
        <td class="text-center pl-0 pr-10" width="130px">{{ user.score }}</td>
        <td @click="deleteListItem(i)" class="pl-0 pr-8" style="width: 40px"><v-icon icon="mdi-close" class="icon-close"></v-icon></td>
      </tr>
      </tbody>
    </v-table>
  </v-row>
</v-container>
</template>

<script setup>
import {ref, onMounted, computed, watch} from "vue"
import { useStore } from "vuex"

const store = useStore()

const leaderboard = computed(() => {
  return store.getters.filteredLeaderboard
})

function deleteListItem (i) {
  store.commit('deleteScore', {index: i})
  store.commit('addScoreToLocalStorage')
}

onMounted(() => {
  store.commit('loadScoreFromLocalStorage')
})
</script>

<style scoped>
.icon-close:hover {
  color: #535353;
  cursor: pointer;
}
</style>
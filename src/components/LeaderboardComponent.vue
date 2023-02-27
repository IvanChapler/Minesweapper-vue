<template>
<v-container>
  <v-row justify="center" style="margin-top: 110px">
    <v-table style="width: 500px">
      <thead>
      <tr>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Score
        </th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(user, i) of leaderboard" :key="i">
        <td>{{ user.username }}</td>
        <td>{{ user.score }}</td>
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

onMounted(() => {
  store.commit('loadScoreFromLocalStorage')
})
</script>

<style scoped>

</style>
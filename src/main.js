import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import vuetify from "./plugins/vuetify.js";

const store = createStore({
    state() {
        return {
            leaderboard: [],
        }
    },
    mutations: {
        increaseScore: (state, payload) => {
            let returned = false;
            state.leaderboard.forEach(item => {
                if(String(item.username) === String(payload.username)) {
                    item.score += payload.score
                    returned = true
                }
            })

            if (returned) return

            state.leaderboard.push(payload)
        },
        addScoreToLocalStorage: (state) => {
            window.localStorage.setItem('leaderboard-list', JSON.stringify(state.leaderboard))
        },
        loadScoreFromLocalStorage: (state) => {
            const dataLeaderboard = window.localStorage.getItem('leaderboard-list')

            if (dataLeaderboard) {
                state.leaderboard = JSON.parse(dataLeaderboard)
            }
        }
    },
    getters: {
        filteredLeaderboard (state) {
            return state.leaderboard.sort((a, b) => b.score - a.score)
        }
    }
})

createApp(App).use(vuetify).use(store).mount('#app')

import Vuex from 'vuex'
import Vue from 'vue'
import * as firebase from "firebase"
import router from '../router'

Vue.use(Vuex)



export const store = new Vuex.Store({
  state: {
    count: 0,
    todayTrain: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setTodayTrain(state, payload) {
      state.todayTrain = payload
      console.log(payload)
    }
  },
  actions: {
    getTodayTrain({commit}) {
      return new Promise((resolve) => {
        firebase.database().ref('/dsadasda/' + '/27-01-2018/' + '/treino/')
          .once('value')
          .then(function(snapshot) {
            commit('setTodayTrain', snapshot.val())
            resolve(snapshot.val())
          })
      })
    }
  },
  getters: {
    todayTrain(state) {
      return state.todayTrain
    }
  }
})

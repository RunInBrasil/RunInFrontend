import Vuex from 'vuex'
import Vue from 'vue'
import * as firebase from "firebase"
import router from '../router'

Vue.use(Vuex)



export const store = new Vuex.Store({
  state: {
    count: 0,
    todayTrain: {},
    trainDays: [],
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setTodayTrain(state, payload) {
      state.todayTrain = payload
    },
    setTrainsDays(state, payload) {
      state.trainDays = Object.keys(payload).splice(1, Object.keys(payload).length)
    }
  },
  actions: {
    getTodayTrain({commit}) {
      return new Promise((resolve) => {
        firebase.database().ref(firebase.auth().currentUser.uid + '/27-01-2018/' + '/treino/')
          .once('value')
          .then(function(snapshot) {
            commit('setTodayTrain', snapshot.val())
            resolve(snapshot.val())
          })
      })
    },
    getTrainDays({commit}) {
      return new Promise((resolve) => {
        firebase.database().ref(firebase.auth().currentUser.uid)
          .once('value')
          .then(function(snapshot) {
            commit('setTrainsDays', snapshot.val())
            resolve(snapshot.val())
          })
      })
    }
  },
  getters: {
    todayTrain(state) {
      return state.todayTrain
    },
    trainDays(state) {
      return state.trainDays
    }
  }
})

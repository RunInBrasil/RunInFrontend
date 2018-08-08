import Vuex from 'vuex'
import Vue from 'vue'
import * as firebase from "firebase"
import router from '../router'

Vue.use(Vuex)



export const store = new Vuex.Store({
  state: {
    count: 0,
    todayTrain: [],
    trainDays: [],
    users: {},
    usersTrains: {}
  },
  mutations: {
    increment (state) {
      state.count++
    },
    setTodayTrain(state, payload) {
      state.todayTrain = []
      for (let data in payload) {
        if (payload[data] != null) {
          state.todayTrain.push(payload[data])
        }
      }
    },
    setTrainsDays(state, payload) {
      state.trainDays = Object.keys(payload)
    },
    setUsers(state, payload) {
      state.users = payload
    },
    setUsersTrains(state, payload) {
      state.usersTrains = []
      for (let user in payload) {
        for (let trainDay in payload[user])  {
          for (var i = 0; i < payload[user][trainDay].treino.length; i++) {
            if (payload[user][trainDay].treino[i] != null) {
              payload[user][trainDay].treino[i].id = i
            }
          }
          for (var i = 0; i < payload[user][trainDay].treino.length; i++) {
            if (payload[user][trainDay].treino[i] == null) {
              payload[user][trainDay].treino.splice(i, 1)
              i--
            }
          }
        }


      }
      state.usersTrains = payload
    }
  },
  actions: {
    getTodayTrain({commit}) {
      return new Promise((resolve) => {
        firebase.database().ref('trains/' + firebase.auth().currentUser.uid + '/' + (new Date()).toISOString().substring(0, 10) + '/treino/')
          .once('value')
          .then(function(snapshot) {
            commit('setTodayTrain', snapshot.val())
            resolve(snapshot.val())
          })
      })
    },
    getTrainDays({commit}) {
      return new Promise((resolve) => {
        firebase.database().ref('trains/' + firebase.auth().currentUser.uid)
          .orderByKey()
          .startAt((new Date()).toISOString().substring(0, 10))
          .once('value')
          .then(function(snapshot) {
            commit('setTrainsDays', snapshot.val())
            console.log(snapshot.val())
            resolve(snapshot.val())
          })
      })
    },
    getUsers({commit}) {
      return new Promise((resolve) => {
        firebase.database().ref('users/')
          .once('value')
          .then(function (snapshot) {
            commit('setUsers', snapshot.val())
            resolve(snapshot.val())
          })
      })
    },
    getUsersTrains({commit}) {
      return new Promise((resolve) => {
        firebase.database().ref('trains/')
          .once('value')
          .then(function (snapshot) {
            commit('setUsersTrains', snapshot.val())
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
    },
    users(state) {
      return state.users
    },
    usersTrains(state) {
      return state.usersTrains
    }
  }
})

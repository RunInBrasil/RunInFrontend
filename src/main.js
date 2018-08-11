// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import * as firebase from "firebase"
import * as firebaseui from 'firebaseui'
import DateFilter from './filters/date'
import TimeFilter from './filters/time'


Vue.use(Vuetify, { theme: {
  primary: '#2196F3',
  secondary: '#2196F3',
  accent: '#82B1FF',
  error: '#FF5252',
  info: '#2196F3',
  success: '#4CAF50',
  warning: '#FFC107'
}})

var config = {
  apiKey: "AIzaSyCPVxFP42DTFixgO9mTDoTep_OW-LTIA18",
  authDomain: "runin-d30a7.firebaseapp.com",
  databaseURL: "https://runin-d30a7.firebaseio.com",
  projectId: "runin-d30a7",
  storageBucket: "runin-d30a7.appspot.com",
  messagingSenderId: "808188414561"
}

// firebase.initializeApp(config)

Vue.config.productionTip = false

Vue.filter('dateFilter', DateFilter)
Vue.filter('timeFilter', TimeFilter)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if(!user) {
        this.$router.push('/login')
      }
    });
  }
})

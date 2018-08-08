<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs8 style="position: relative; top: 15px">
              <span>Treino de Hoje: {{(new Date()).toISOString().substring(0, 10) | dateFilter}}</span>
            </v-flex>

            <v-flex xs4 style="position: relative; left: 30px">
              <v-btn round
                     outline
                     light
                     class="primary--text"
                     @click="signOut">
                Sair
              </v-btn>
            </v-flex>

          </v-layout>
          <div width="350px"
               class="mt-4 mb-5 my-card"
          >
            <v-flex xs12>
              <v-card-text v-for="(step, index) in todayTrain">
                <span>
                {{ step.time / 60 }} minutos na velocidade {{ step.speed }}
                </span>
                <br>
              </v-card-text>
            </v-flex>
          </div>

          <span>Proximos Treinos:</span>
          <v-container class="text-xs-center" v-bind="{ [`grid-list-xs`]: true }" fluid>
            <v-layout row wrap>
              <v-flex
                v-for="day in trainDays"
                :key="day"
                xs4
                class="my-card ma-2">
                {{ day | dateFilter }}
              </v-flex>
            </v-layout>
          </v-container>

          <v-flex xs12>
            <v-btn round class="bt primary" style="position: absolute;" @click="$router.push('vamos_nessa')">
              Iniciar treino
            </v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  import firebase from 'firebase'

  export default {
    computed: {
      todayTrain() {
        return this.$store.getters.todayTrain
      },
      trainDays() {
        return this.$store.getters.trainDays
      }
    },
    methods: {
      signOut() {
        firebase.auth().signOut()
      }
    },
    beforeMount() {
      firebase.auth().onAuthStateChanged((user) => {
        this.$store.dispatch('getTodayTrain')
        this.$store.dispatch('getTrainDays')
        firebase.database().ref('users/' + firebase.auth().currentUser.uid)
          .set({
            name: firebase.auth().currentUser.displayName,
            email: firebase.auth().currentUser.email
          })
      })
    },
    mounted() {
      this.$store.dispatch('getTodayTrain')
      this.$store.dispatch('getTrainDays')
      firebase.database().ref('users/' + firebase.auth().currentUser.uid)
        .set({
          name: firebase.auth().currentUser.displayName,
          email: firebase.auth().currentUser.email
        })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .bt {
    position: absolute;
    bottom: 20px;
    left: 33%;
  }

  .my-card {
    border: 1px solid #2196F3;
    border-radius: 15px;
  }
</style>

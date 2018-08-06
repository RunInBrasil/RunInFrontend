<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <v-flex xs12>
          <span>Treino de Hoje: 12/09/2018</span>
          <v-card width="350px" class="mt-2 mb-5">
            <v-flex xs12>
              <v-card-text v-for="(step, index) in todayTrain">
                <span>
                {{ step.time / 60 }} minutos na velocidade {{ step.speed }}
                </span>
                <br>
              </v-card-text>
            </v-flex>
          </v-card>

          <span>Proximos Treinos:</span>
          <v-card>
          </v-card>

          <v-flex xs12>
            <v-btn round class="bt primary" @click="$router.push('vamos_nessa')">
              Iniciar treino
            </v-btn>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
  export default {
    computed: {
      todayTrain () {
        return this.$store.getters.todayTrain
      }
    },
    beforeMount() {
      this.$store.dispatch('getTodayTrain')
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
</style>

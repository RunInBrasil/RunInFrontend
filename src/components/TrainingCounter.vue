<template>
  <v-container class="text-xs-center">
    <v-layout row wrap>
      <v-flex xs12>
        <h1>{{ totalTime }}</h1>
        <v-flex xs12>
          <v-progress-circular
            :rotate="360"
            :size="300"
            :width="5"
            :value="value"
            class="mb-3"
            color="secondary"
          >
            <h1>
              {{ timeFilter }}
            </h1>
          </v-progress-circular>
        </v-flex>
        <v-flex xs12 class="
          headline
          font-weight-light
          font-italic">
          <span> {{actualStep + 1 }}o Round</span>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs2>
            <span class="title grey--text"
                  style="position: relative; left: 10px; top: 74px">
              Vel:
            </span>
          </v-flex>
          <v-flex xs12>
            <v-slide-x-transition>
          <span class="
          font-weight-light
          font-italic
          primary--text
          pr-4"
                style="font-size: 150px"
          v-if="speedVisible">
            {{ train[actualStep].speed }}
          </span>
            </v-slide-x-transition>
          </v-flex>
        </v-layout>


        <v-slide-x-transition>
          <v-layout row wrap v-if="train.length > actualStep + 1 && stepTime - timePassed <= 15">
            <v-flex xs4>
            <span class="title grey--text"
                  style="position: relative; left: 10px; top: 0px">
              Prox. Vel:
            </span>
            </v-flex>
            <v-flex xs12>
          <span class="
          display-1 primary--text"
                style=" position: relative; top: -30px">
            {{ train[actualStep + 1].speed }}
          </span>
            </v-flex>
          </v-layout>
        </v-slide-x-transition>
      </v-flex>

      <v-flex xs4 class="mt-5">
        <v-fade-transition mode="in-out">
          <v-btn
            v-if="!timerSwitch"
            color="secondary"
            dark
            large
            fab
            class="bt"
            @click="startTimer"
          >
            <v-icon>play_arrow</v-icon>
          </v-btn>

          <v-btn
            v-else
            color="secondary"
            dark
            class="bt"
            large
            fab
            @click="stopTimer"
          >
            <v-icon>pause</v-icon>
          </v-btn>
        </v-fade-transition>

      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    name: "TrainingCounter",
    data() {
      return {
        value: 0,
        timerSwitch: false,
        timePassed: 0,
        actualStep: 0,
        speedVisible: true,
        finished: false
      }
    },
    computed: {
      timeFilter() {
        let minutes = Math.floor(((this.stepTime - this.timePassed)) / 60)
        let seconds = Math.round(((this.stepTime - this.timePassed)) % 60)
        return ("00" + minutes).slice(-2) + ':' + ("00" + seconds).slice(-2)
      },
      stepTime() {
        return this.train[this.actualStep].time
      },
      train() {
        return this.$store.getters.todayTrain
      },
      totalTime() {
        let totalTime = 0
        let timeAlreadyPast = 0
        for (let train in this.train) {
          totalTime = totalTime + this.train[train].time
          if (train < this.actualStep) {
            timeAlreadyPast = timeAlreadyPast + this.train[train].time
          }
        }
        return this.filterTime(totalTime - this.timePassed - timeAlreadyPast)
      }
    },
    methods: {
      filterTime(time) {
        let minutes = Math.floor((time) / 60)
        let seconds = Math.round((time) % 60)
        return ("00" + minutes).slice(-2) + ':' + ("00" + seconds).slice(-2)
      },
      startTimer() {
        this.timerSwitch = true
        window.setTimeout(partB => {
          if (this.timerSwitch) {
            this.timePassed = this.timePassed + 1
            this.value = (this.timePassed * 100) / this.stepTime
            this.startTimer()
          }
        }, 1000)
      },
      stopTimer() {
        this.timerSwitch = false
      }
    },
    watch: {
      timePassed: function (value) {
        if (value >= this.train[this.actualStep].time) {
          this.timePassed = 0
          this.actualStep++
          this.speedVisible = false
          window.setTimeout(func => {
            this.speedVisible = true
          }, 500)
        }
      }
    },
    beforeMount() {
      this.$store.dispatch('getTodayTrain')
    }
  }
</script>

<style scoped>
  .bt {
    position: absolute;
    bottom: 20px;
    left: 38%;
  }
</style>

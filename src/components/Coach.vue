<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12>
        <v-list>
          <v-list-tile v-for="(user, index) in users"
                       :key="index">
            <v-list-tile-title>
              <span>
              {{ user.name }}
              </span>
            </v-list-tile-title>
            <v-btn
              color="primary"
              fab
              small
              outline
              dark
              right
              @click="editUser(user, index)"
            >
              <v-icon>edit</v-icon>
            </v-btn>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
    <!--<v-fab-transition>-->
    <!--<v-btn-->
    <!--color="primary"-->
    <!--fab-->
    <!--dark-->
    <!--right-->
    <!--style="position: absolute; bottom: 5%"-->
    <!--@click="editUser"-->
    <!--&gt;-->
    <!--<v-icon>add</v-icon>-->
    <!--</v-btn>-->
    <!--</v-fab-transition>-->


    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            {{ selectedUser.name }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <!--<v-toolbar-items>-->
          <!--<v-btn dark flat @click.native="dialog = false">Salvar</v-btn>-->
          <!--</v-toolbar-items>-->
        </v-toolbar>
        <v-list>
          <v-flex class="my-card ma-3"
                  v-for="(trainDay, index) in getUserTrains(selectedUser.id)">
            <v-subheader> {{index | dateFilter}}</v-subheader>
            <v-list-tile avatar
                         v-for="(treino, stepIndex) in trainDay.treino">
              <v-layout row wrap>
                <v-list-tile-content>
                  <v-list-tile-title>Velocidade {{ treino.speed }}</v-list-tile-title>
                  <v-list-tile-sub-title>Por {{ treino.time / 60 }} minutos
                  </v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn flat @click="deleteStep(treino.id, index)">
                    <v-icon class="primary--text">
                      close
                    </v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-layout>
            </v-list-tile>
          </v-flex>

          <v-flex class="my-card ma-3 pa-3">

            <v-menu
              class="mb-3"
              ref="menu"
              :close-on-content-click="false"
              v-model="menu"
              :nudge-right="40"
              :return-value.sync="date"
              lazy
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <v-text-field
                slot="activator"
                v-model="dateFiltered"
                :label="date | dateFilter"
                prepend-icon="event"
                readonly
              ></v-text-field>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
              </v-date-picker>
            </v-menu>

            <v-layout row wrap class="mt-5 mb-5">
              <v-flex xs1>
              <span>
                  Velocidade:
                    </span>
              </v-flex>
              <v-flex xs11>
              <v-slider
                v-model="speed"
                thumb-label="always"
                step="0.1"
                ticks="always"
                max="20"
                persistent-hint
                class="ml-3"
                hint="speed"
              ></v-slider>
              </v-flex>
              <v-flex xs12>
                <span>
                {{ speed === 0 ? 'Descanço' : ''}}
              </span>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
                  <span>
                  Por minutos:
                  </span>
              <v-slider
                v-model="time"
                step="0.5"
                max="60"
                ticks="always"
                persistent-hint
                class="ml-3"
                hint="speed"
              ></v-slider>
            </v-layout>
            <span>
                {{ formattedTime() }}
              </span>

            <v-layout row wrap>
              <v-spacer></v-spacer>
              <v-flex xs12>
                <v-btn class="primary" @click="saveTrain">
                  Salvar
                </v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-list>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<script>
  import firebase from 'firebase'
  import dateFilter from '../filters/date'

  export default {
    name: "Coach",
    data() {
      return {
        selectedUser: {},
        dialog: false,
        date: (new Date()).toISOString().substring(0, 10),
        menu: false,
        steps: [],
        speed: 0,
        time: 0
      }
    },
    computed: {
      users() {
        return this.$store.getters.users
      },
      dateFiltered() {
        return dateFilter(this.date)
      },
      // formattedTime() {
      //   let labelArray = []
      //   for (let i = 0; i < 120; i++) {
      //     if (i % 2 === 0) {
      //       labelArray.push((i / 2) + '\',')
      //     } else {
      //       labelArray.push((i / 2) + '\'30\"')
      //     }
      //   }
      //   console.log(labelArray)
      //   return labelArray
      // }
    },
    methods: {
      formattedTime() {
        let stringTime = this.time + ''
        if (stringTime.indexOf('.') > -1) {
          stringTime = stringTime.split('.')[0] + '\'30\"'
        } else {
          stringTime = stringTime + '\''
        }
        return stringTime
        // if (String.valueOf(this.time))
        // return this.time === 0 ? 'Descanço' :
        //   this.time % 2 === 0 ? Math.round((this.time / 2)) + '\'30\"' :
        //     Math.round((this.time / 2)) + '\''
      },
      editUser(user, index) {
        this.selectedUser = {
          name: user.name,
          email: user.email,
          id: index
        }
        this.dialog = true
      },
      getUserTrains(userId) {
        if (this.$store.getters.usersTrains[userId] != null) {
          return this.$store.getters.usersTrains[userId]
        }
        return []
      },
      saveTrain() {
        let index = 0
        if (this.$store.getters.usersTrains[this.selectedUser.id][this.date] != null) {
          index = this.$store.getters.usersTrains[this.selectedUser.id][this.date].treino[
          Object.keys(this.$store.getters.usersTrains[this.selectedUser.id][this.date].treino).length
          - 1
            ].id + 1
        }
        firebase.database().ref('trains/' + this.selectedUser.id + '/' + this.date + '/treino/' + index).set(
          {
            speed: this.speed,
            time: this.time * 60
          }
        )
        this.$store.dispatch('getUsersTrains')
      },
      deleteStep(stepid, date) {
        firebase.database().ref('trains/' + this.selectedUser.id + '/' + date + '/treino/' + stepid).remove()
        this.$store.dispatch('getUsersTrains')
      }

      // "0',", "0'30",", "1',", "1'30",", "2',", "2'30",", "3',", "3'30",", "4',", "4'30",", "5',", "5'30",", "6',", "6'30",", "7',", "7'30",", "8',", "8'30",", "9',", "9'30",", "10',", "10'30",", "11',", "11'30",", "12',", "12'30",", "13',", "13'30",", "14',", "14'30",", "15',", "15'30",", "16',", "16'30",", "17',", "17'30",", "18',", "18'30",", "19',", "19'30",", "20',", "20'30",", "21',", "21'30",", "22',", "22'30",", "23',", "23'30",", "24',", "24'30",", "25',", "25'30",", "26',", "26'30",", "27',", "27'30",", "28',", "28'30",", "29',", "29'30",", "30',", "30'30",", "31',", "31'30",", "32',", "32'30",", "33',", "33'30",", "34',", "34'30",", "35',", "35'30",", "36',", "36'30",", "37',", "37'30",", "38',", "38'30",", "39',", "39'30",", "40',", "40'30",", "41',", "41'30",", "42',", "42'30",", "43',", "43'30",", "44',", "44'30",", "45',", "45'30",", "46',", "46'30",", "47',", "47'30",", "48',", "48'30",", "49',", "49'30","
    },

    beforeMount() {

      this.$store.dispatch('getUsers')
      this.$store.dispatch('getUsersTrains')
    }
  }
</script>

<style scoped>
  .my-card {
    border: 1px solid;
    border-radius: 10px;
  }
</style>

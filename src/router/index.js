import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import TrainingCounter from '@/components/TrainingCounter'
import Coach from '@/components/Coach'
import PrivacyPolicy from '@/components/PrivacyPolicy'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/vamos_nessa',
      name: 'TrainingCounter',
      component: TrainingCounter
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/coach',
      component: Coach
    },
    {
      path: '/politica_privacidade',
      component: PrivacyPolicy
    },

  ]
})

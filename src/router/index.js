import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TrainingCounter from '@/components/TrainingCounter'


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
    }
  ]
})
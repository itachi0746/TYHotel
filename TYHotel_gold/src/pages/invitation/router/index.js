import Vue from 'vue'
import Router from 'vue-router'
import Invitation from '../components/Invitation.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Invitation',
      component: Invitation
    }
  ]
})

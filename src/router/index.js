import Vue from 'vue'
import Router from 'vue-router'
import List from '../components/List'
import ListDetail from '../components/ListDetail'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'auth',
    //   component: Auth
    // },

    {
      // path: '/',
      path: '/',
      name: 'list',
      component: List
    },

    {
      path: '/list-detail/:id',
      name: 'list-detail',
      component: ListDetail
    },

  ]
})
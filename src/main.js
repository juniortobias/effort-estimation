// // The Vue build version to load with the `import` command
// // (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import BootstrapVue from "bootstrap-vue"
// import App from './App'
// import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// Vue.use(BootstrapVue)
// Vue.config.productionTip = false

// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })



import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import EventBus from './plugins/event-bus'
import Vuelidate from 'vuelidate'
import {store} from './store/store'
import routes from './routes'
// import Master from './components/layouts/Master'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);
Vue.use(EventBus)
Vue.use(Vuelidate)
Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.getters.loggedIn) {
//       next({
//         name: 'app',
//       })
//     } else {
//       next()
//     }
//   } else if (to.matched.some(record => record.meta.requiresVisitor)) {
//     if (store.getters.loggedIn) {
//       next({
//         name: 'list',
//       })
//     } else {
//       next()
//     }
//   }  {
//     next() // make sure to always call next()!
//   }
// })

// new Vue({
//   el: '#app',
//   router: router,
//   store: store,
//   components: { Master },
//   template: '<Master/>'
// })

new Vue({
  el: '#app',
  router: router,
  store: store,
//   template: '<App/>',
//   components: { App }
// })
render: h => h(App)
}).$mount('#app')
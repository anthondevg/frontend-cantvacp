import Vue from 'vue'
//import App from './App.vue'
import router from './router'
import store from './store'
import NavMain from './layouts/navmain.vue'
import VuePageTransition from 'vue-page-transition'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
import Axios from 'axios';
// setting up the endpoint !!!!!!!
Axios.defaults.baseURL = process.env.VUE_APP_API_ENDPOINT;

Vue.prototype.$eventHub = new Vue(); // Global event bus
Vue.prototype.$http = Axios;

Vue.use(Buefy)
Vue.use(VuePageTransition)
Vue.config.productionTip = false

// guards to protect the routes from auth or unauth users
// https://router.vuejs.org/guide/advanced/navigation-guards.html#
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else { 
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'controlPanel'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(NavMain)
}).$mount('#app')

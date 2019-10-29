import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ './auth/Login.vue'),
      meta: {
        requiresVisitor: true
      }
    },

    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './auth/Register.vue'),
      meta: {
        requiresVisitor: true
      }
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "logout" */ './auth/Logout.vue')
    },
    {
      path: '/nuevo/presupuesto',
      name: 'newBudget',
      component: () => import(/* webpackChunkName: "logout" */ './views/addBudget.vue'),
      meta: {
        requiresAuth: true
      }
    },    
    {
      path: '/nuevo/tipo',
      name: 'addType',
      component: () => import(/* webpackChunkName: "logout" */ './views/addType.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/presupuesto/:id', 
      name: 'presupuesto', 
      component: () => import(/* webpackChunkName: "logout" */ './views/editBudget.vue')
      ,meta: {
        requiresAuth: true
      }
    },
    {
      path: '/controles',
      name: 'controlPanel',
      component: () => import(/* webpackChunkName: "addExpense" */ './views/controlPanel.vue')
      ,meta: {
        requiresAuth: true
      }
    },
    {
      path: '/control/:id',
      name: 'control',
      component: () => import(/* webpackChunkName: "addExpense" */ './components/Control.vue')
      ,meta: {
        requiresAuth: true
      }
    },
    {
      path: '/nuevo/control',
      name: 'addControl',
      component: () => import(/* webpackChunkName: "addExpense" */ './views/addControl.vue')
      ,meta: {
        requiresAuth: true
      }
    },
    {
      path: '/nuevo/gasto/:id',
      name: 'addExpense',
      component: () => import(/* webpackChunkName: "addExpense" */ './views/addExpense.vue')
      ,meta: {
        requiresAuth: true
      }
    },
    {
      path: '/config',
      name: 'Config',
      component: () => import(/* webpackChunkName: "login" */ './views/Config.vue'),meta: {
        requiresAuth: true
      }
    },
    {
      path: '/nuevo/anticipo',
      name: 'newAdvance',
      component: () => import(/* webpackChunkName: "login" */ './views/newAdvance.vue'),meta: {
        requiresAuth: true
      }
    },
    {
      path: '/editar/control/:id',
      name: 'editControl',
      component: () => import(/* webpackChunkName: "login" */ './views/editControl.vue'),meta: {
        requiresAuth: true
      }
    },
  ]
})

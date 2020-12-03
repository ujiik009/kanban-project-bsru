import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import Kanban from '../components/Kanban.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },

  { path: '/kanban/:project_id', component: Kanban },

  {
    path: '/project',
    name: 'project',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/Project')
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

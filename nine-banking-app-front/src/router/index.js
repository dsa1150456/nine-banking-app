import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Service from '../views/Service.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import SignUp from '../views/SignUp.vue'
const router = createRouter({
  history: createWebHistory(
    import.meta.env.BASE_URL),
  routes: [{
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/service',
      name: 'service',
      component: Service
    },
    {
      path: '/:catchNotMatchPath(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

export default router
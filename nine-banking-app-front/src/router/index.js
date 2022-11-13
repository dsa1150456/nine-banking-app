import {
  createRouter,
  createWebHistory
} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AccountView from '../views/AccountView.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import SignUp from '../views/SignUp.vue'
import {
  checkData
} from "../service/profile";
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
      path: '/account',
      name: 'account',
      component: AccountView
    },
    {
      path: '/:catchNotMatchPath(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ]
})

const isLogin = checkData();

// guard route
router.beforeEach(async (to, from) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  if (to.name === "login" && isLogin.value) {
    return {
      name: "home"
    };
  }
  if (to.name === "account" && !isLogin.value) {
    return {
      name: "home"
    };
  }
})
export default router
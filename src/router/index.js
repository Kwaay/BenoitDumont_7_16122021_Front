import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Accueil from '../components/Accueil.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

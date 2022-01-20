import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../components/Register.vue';
import Login from '../components/Login.vue';
import Accueil from '../components/Accueil.vue';
import Settings from '../components/Settings.vue';
import Profil from '../components/Profil.vue';
import Dashboard from '../components/Dashboard.vue';

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
    path: '/profil',
    name: 'Profil',
    component: Profil,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/admin/dashboard',
    name: 'Admin Dashboard',
    component: Dashboard,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

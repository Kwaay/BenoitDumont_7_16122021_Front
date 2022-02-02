import Vue from 'vue';
import VueRouter from 'vue-router';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import Accueil from '../views/Accueil.vue';
import Settings from '../views/Settings.vue';
import Profil from '../views/Profil.vue';
import DashboardHome from '../views/DashboardHome.vue';
import DashboardUser from '../views/DashboardUser.vue';
import DashboardPost from '../views/DashboardPost.vue';
import DashboardToken from '../views/DashboardToken.vue';
import UserEdit from '../views/UserEdit.vue';
import PostEdit from '../views/PostEdit.vue';
import CommentEdit from '../views/CommentEdit.vue';

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
    path: '/profil/:UserId',
    name: 'Profil',
    component: Profil,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/user/:UserId/edit',
    name: 'User Modification',
    component: UserEdit,
  },
  {
    path: '/admin/post/:PostId/edit',
    name: 'Post Modification',
    component: PostEdit,
  },
  {
    path: '/admin/dashboard',
    name: 'Home Dashboard',
    component: DashboardHome,
  },
  {
    path: '/admin/user',
    name: 'User Dashboard',
    component: DashboardUser,
  },
  {
    path: '/admin/post',
    name: 'Post Dashboard',
    component: DashboardPost,
  },
  {
    path: '/admin/token',
    name: 'Token Dashboard',
    component: DashboardToken,
  },
  {
    path: '/admin/user/:UserId/edit',
    name: 'User Admin Modification',
    component: UserEdit,
  },
  {
    path: '/admin/post/:PostId/edit',
    name: 'Post Admin Modification',
    component: PostEdit,
  },
  {
    path: '/admin/comment/:CommentId/edit',
    name: 'Comment Admin Modification',
    component: CommentEdit,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

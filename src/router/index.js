import Vue from 'vue';
import VueRouter from 'vue-router';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Accueil from '../views/Accueil.vue';
import Post from '../views/Post.vue';
import Settings from '../views/Settings.vue';
import Profil from '../views/Profil.vue';
import DashboardHome from '../views/DashboardHome.vue';
import DashboardUser from '../views/DashboardUser.vue';
import DashboardPost from '../views/DashboardPost.vue';
import DashboardComment from '../views/DashboardComment.vue';
import DashboardToken from '../views/DashboardToken.vue';
import UserEdit from '../views/UserEdit.vue';
import PostEdit from '../views/PostEdit.vue';
import CommentEdit from '../views/CommentEdit.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: {
      auth: false,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      auth: false,
    },
  },
  {
    path: '/',
    name: 'Accueil',
    component: Accueil,
    meta: {
      auth: true,
    },
  },
  {
    path: '/post/:PostId',
    name: 'Post',
    component: Post,
    meta: {
      auth: true,
    },
  },
  {
    path: '/profil/:UserId',
    name: 'Profil',
    component: Profil,
    meta: {
      auth: true,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      auth: true,
    },
  },
  {
    path: '/user/:UserId/edit',
    name: 'User Modification',
    component: UserEdit,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/post/:PostId/edit',
    name: 'Post Modification',
    component: PostEdit,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/dashboard',
    name: 'Home Dashboard',
    component: DashboardHome,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/user',
    name: 'User Dashboard',
    component: DashboardUser,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/post',
    name: 'Post Dashboard',
    component: DashboardPost,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/comment',
    name: 'Comment Dashboard',
    component: DashboardComment,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/token',
    name: 'Token Dashboard',
    component: DashboardToken,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/user/:UserId/edit',
    name: 'User Admin Modification',
    component: UserEdit,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/post/:PostId/edit',
    name: 'Post Admin Modification',
    component: PostEdit,
    meta: {
      auth: true,
    },
  },
  {
    path: '/admin/comment/:CommentId/edit',
    name: 'Comment Admin Modification',
    component: CommentEdit,
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth !== true) {
    return next();
  }
  const tokenData = JSON.parse(localStorage.getItem('token'));
  if (tokenData === null) return next({ name: 'Login' });

  const { token, time } = JSON.parse(localStorage.getItem('token')) || {};
  if (token === undefined || token.length < 1) {
    return next({ name: 'Login' });
  }

  if (time > time + 86400000) {
    return next({ name: 'Login' });
  }
  return next();
});

export default router;

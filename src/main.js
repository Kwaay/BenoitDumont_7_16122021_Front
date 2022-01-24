import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import VueToastify from 'vue-toastify';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.component('multiselect', Multiselect);
Vue.use(VueToastify);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

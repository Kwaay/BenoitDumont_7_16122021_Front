import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import VueToastify from 'vue-toastify';
import DataTable from '@andresouzaabreu/vue-data-table';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.component('multiselect', Multiselect);
Vue.use(VueToastify);
Vue.component('data-table', DataTable);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

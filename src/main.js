import Vue from 'vue';
import Multiselect from 'vue-multiselect';
import VueToastify from 'vue-toastify';
import DataTable from '@andresouzaabreu/vue-data-table';
import i18n from './I18n';
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
  i18n,
  render: (h) => h(App),
}).$mount('#app');

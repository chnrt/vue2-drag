// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import App from './App';
import store from './vuex/store';
import ClassbrandEdit from './views/ClassbrandEdit';

Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  { path: '/classbrand', component: ClassbrandEdit },
  { path: '*', redirect: '/classbrand' },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
}).$mount('#edit');

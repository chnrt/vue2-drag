// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App';
import store from './vuex/store';
import ClassbrandEdit from './views/ClassbrandEdit';

Vue.use(VueRouter);

const routes = [
  { path: '/classbrand', component: ClassbrandEdit },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

/* eslint-disable no-new */
new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
}).$mount('#edit');

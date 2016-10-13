// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Element from 'element-ui';
import App from './App';
import store from './vuex/store';
// Vue.use(Element);
// Vue.component(Select.name, Select);
// Vue.component(Button.name, Button);
// Vue.component(Nav.name, Nav);

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  render: h => h(App),
});
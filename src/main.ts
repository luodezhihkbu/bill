import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';

Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
window.onload = function () {
  if (window.innerWidth > 500) {
    window.alert('为了保证预览效果，请用手机打开链接预览~');
  }
};

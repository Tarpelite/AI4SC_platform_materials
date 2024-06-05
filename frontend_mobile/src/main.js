import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss' // global css
import PermissionMixin from './mixins/permissions.js'
import '@/utils/flexible.js'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
import VueMarkdown from "vue-markdown";
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import mavonEditor from 'mavon-editor'
import VueGoodTablePlugin from 'vue-good-table';
// import the styles
import 'vue-good-table/dist/vue-good-table.css'
import { Toast } from 'mint-ui';

Vue.prototype.$toast = Toast
Vue.use(VueGoodTablePlugin);
Vue.use(Mint);
Vue.use(mavonEditor)
Vue.use(VueAwesomeSwiper)
Vue.component('vue-markdown', VueMarkdown);
Vue.component('swiper', swiper);
Vue.component('swiper-slide', swiperSlide);

Vue.mixin(PermissionMixin)
Vue.config.productionTip = false
Vue.mixin({
  data() {
    return {
      microAppEnvironment: (window && window.__MICRO_APP_ENVIRONMENT__) || false
    }
  }
})

let app = null
function mount() {
  app = new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

function unmount() {
  app.$destroy()
  app.$el.innerHTML = ''
  app = null
}

if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = {
    mount,
    unmount
  }
} else {
  mount()
}

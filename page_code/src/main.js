import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'
import '@/css/index.scss'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueLazyload from 'vue-lazyload'
import VueMarkdown from "vue-markdown";
import VueAwesomeSwiper from 'vue-awesome-swiper'
require('swiper/dist/css/swiper.css')
import {swiper, swiperSlide} from 'vue-awesome-swiper'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
})
// use
Vue.use(mavonEditor)
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('swiper', swiper);
Vue.component('swiper-slide', swiperSlide);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

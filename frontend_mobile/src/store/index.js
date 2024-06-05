import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import user from './modules/user';
import tagsView from './modules/tagsView';
import permission from './modules/permission';
import app from './modules/app';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    tagsView,
    permission,
    app,
    settings
  },
  getters
});

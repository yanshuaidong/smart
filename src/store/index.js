import Vue from 'vue';
import Vuex from 'vuex';
import tab from './tab';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // 引入模块，因为实际中我们要管理的模块不止一个。一会再编写tab模块
    tab,
  },
});

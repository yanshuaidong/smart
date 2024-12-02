// tab.js,我放在根目录下/store/tab.js
export default {
  state: {
    // 这里放要管理的状态
    isCollapse: false,
  },
  mutations: {
    // 定义待发送的事件，第一个参数会注入当前的state
    exchange(state) {
      state.isCollapse = !state.isCollapse;
    },
  },
};

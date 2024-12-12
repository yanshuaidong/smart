import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import DataBoard from '../views/data-board/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/boards',
    name: 'DataBoard',
    component: DataBoard,
    children: [
      {
        path: ':path',
        name: 'DataBoard',
        component: DataBoard,
      },
    ],
  },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== 'NavigationDuplicated') throw err;
  });
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

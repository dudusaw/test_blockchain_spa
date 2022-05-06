import { createRouter, createWebHistory } from "vue-router";

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: 'changer',
      path: '/',
      component: () => import('../components/ChangerPage.vue'),
    },
    {
      name: 'profile',
      path: '/profile',
      component: () => import('../components/TheProfile.vue'),
    },
  ]
});
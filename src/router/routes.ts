import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    children: [
      {
        path: 'glossary',
        name: 'Glossary',
        component: () => import('pages/GlossaryPage.vue')
      },
      {
        path: 'graph',
        name: 'Graph',
        component: () => import('pages/GraphPage.vue'),
      }
    ],
    component: () => import('layouts/MainLayout.vue'),
    redirect() {
      return 'glossary';
    },
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

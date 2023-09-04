import { createRouter, createWebHistory } from 'vue-router';

import { getRouteComponent } from './componentsMap.ts';

declare module 'vue-router' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface RouteMeta {
    title: string
  }
}

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: getRouteComponent({ keys: ['home'] }),
          meta: {
            title: '首页',
          },
        },
        {
          path: '/sub',
          name: 'Sub',
          component: getRouteComponent({ keys: ['sub'] }),
          meta: {
            title: '订阅管理',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: getRouteComponent({ keys: ['error', 'notFound'] }),
      meta: {
        title: '404',
      },
    },
  ],
});

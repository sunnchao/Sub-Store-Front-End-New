import { createRouter, createWebHistory } from 'vue-router';

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
          component: () => import('../pages/Home/index.vue'),
          meta: {
            title: '首页',
          },
        },
        {
          path: '/sub',
          name: 'Sub',
          component: () => import('../pages/Sub/index.vue'),
          meta: {
            title: '订阅管理',
          },
        },
        {
          path: '/compare/:type(sub|collection)/:name',
          name: 'Compare',
          component: () => import('../pages/Compare/index.vue'),
        },
        {
          path: '/create/:type(sub|collection)',
          name: 'CreateSub',
          component: () => import('../pages/Editor/Create.vue'),
        },
        {
          path: '/edit/:type(sub|collection)/:name',
          name: 'EditSub',
          component: () => import('../pages/Editor/Edit.vue'),
        },
        {
          path: '/modules',
          name: 'Modules',
          component: () => import('../pages/Modules/index.vue'),
          meta: {
            title: '模块管理',
          },
        },
        // {
        //   path: '/module/:name',
        //   name: 'Module',
        //   component: () => import('../pages/Modules/Module/index.vue'),
        //   meta: {
        //     title: '模块详情',
        //   },
        // },
        {
          path: '/settings',
          name: 'Settings',
          component: () => import('../pages/Settings/index.vue'),
          meta: {
            title: '设置',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/Error/NotFound/index.vue'),
      meta: {
        title: '404',
      },
    },
  ],
});

import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-settings',
      keepAlive: true,
      order: 9999,
      title: '设置',
    },
    name: 'Settings',
    path: '/settings',
    children: [
      {
        meta: { title: '权限管理', icon: 'material-symbols:construction' },
        name: 'settings/permission',
        path: '/settings/permission',
        children: [
          {
            meta: { title: '用户管理' },
            name: 'settings/permission/user',
            path: '/settings/permission/user',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '资源管理' },
            name: 'settings/permission/resource',
            path: '/settings/permission/resource',
            component: () => import('#/views/system/resource/index.vue'),
          },
          {
            meta: { title: '角色管理' },
            name: 'settings/permission/role',
            path: '/settings/permission/role',
            component: () => import('#/views/demos/element/index.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;

import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-card-travel',
      keepAlive: true,
      order: 1001,
      title: '物料',
    },
    name: 'WL',
    path: '/wl',
    children: [
      {
        meta: { title: '主数据建模', icon: 'material-symbols:construction' },
        name: 'wl/model',
        path: '/wl/element',
        children: [
          {
            meta: { title: '模型定义' },
            name: 'wl/model/definition',
            path: '/wl/model/definition',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '业务扩展' },
            name: 'wl/model/extend',
            path: '/wl/model/extend',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '工作流管理' },
            name: 'wl/model/workflow',
            path: '/wl/model/workflow',
            component: () => import('#/views/demos/element/index.vue'),
          },
        ],
      },
      {
        meta: { title: '主数据维护', icon: 'material-symbols:article' },
        name: 'wl/content',
        path: '/wl/content',
        children: [
          {
            meta: { title: '数据列表' },
            name: 'wl/content/list',
            path: '/wl/content/list',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '批量导入' },
            name: 'wl/content/import',
            path: '/wl/content/import',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '导出定义' },
            name: 'wl/content/export',
            path: '/wl/content/export',
            component: () => import('#/views/demos/element/index.vue'),
          },
        ],
      },
      {
        meta: { title: '主数据集成', icon: 'material-symbols:webhook' },
        name: 'wl/dsb',
        path: '/wl/dsb',
        children: [
          {
            meta: { title: '数据订阅' },
            name: 'wl/dsb/sub',
            path: '/wl/dsb/sub',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '分发日志' },
            name: 'wl/dsb/log',
            path: '/wl/dsb/log',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '通知推送' },
            name: 'wl/dsb/alert',
            path: '/wl/dsb/alert',
            component: () => import('#/views/demos/element/index.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;

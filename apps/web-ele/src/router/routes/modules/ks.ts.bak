import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const routes: RouteRecordRaw[] = [
  {
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-card-travel',
      keepAlive: true,
      order: 1001,
      title: '客商',
    },
    name: 'KS',
    path: '/ks',
    children: [
      {
        meta: { title: '主数据建模', icon: 'material-symbols:construction' },
        name: 'ks/model',
        path: '/ks/element',
        children: [
          {
            meta: { title: '模型定义' },
            name: 'ks/model/definition',
            path: '/ks/model/definition',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '业务扩展' },
            name: 'ks/model/extend',
            path: '/ks/model/extend',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '工作流管理' },
            name: 'ks/model/workflow',
            path: '/ks/model/workflow',
            component: () => import('#/views/demos/element/index.vue'),
          },
        ],
      },
      {
        meta: { title: '主数据维护', icon: 'material-symbols:article' },
        name: 'ks/content',
        path: '/ks/content',
        children: [
          {
            meta: { title: '数据列表' },
            name: 'ks/content/list',
            path: '/ks/content/list',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '批量导入' },
            name: 'ks/content/import',
            path: '/ks/content/import',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '导出定义' },
            name: 'ks/content/export',
            path: '/ks/content/export',
            component: () => import('#/views/demos/element/index.vue'),
          },
        ],
      },
      {
        meta: { title: '主数据集成', icon: 'material-symbols:webhook' },
        name: 'ks/dsb',
        path: '/ks/dsb',
        children: [
          {
            meta: { title: '数据订阅' },
            name: 'ks/dsb/sub',
            path: '/ks/dsb/sub',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '分发日志' },
            name: 'ks/dsb/log',
            path: '/ks/dsb/log',
            component: () => import('#/views/demos/element/index.vue'),
          },
          {
            meta: { title: '通知推送' },
            name: 'ks/dsb/alert',
            path: '/ks/dsb/alert',
            component: () => import('#/views/demos/element/index.vue'),
          },
        ],
      },
    ],
  },
];

export default routes;

<script lang="js" setup>
import { Page } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { ElButton, ElSwitch, ElTable, ElTableColumn } from 'element-plus';

const data = [
  {
    id: 1,
    title: '首页',
    icon: 'material-symbols:construction',
    sort: 1,
    permission: 'sys:home',
    path: '/home',
    enable: true,
    createTime: '2021-09-01 00:00:00',
    createBy: 'admin',
    updateTime: '2021-09-01 00:00:00',
    updateBy: 'admin',
    children: [
      {
        id: 11,
        title: '子菜单1',
        icon: 'material-symbols:subdirectory-arrow-right',
        sort: 1,
        permission: 'sys:home:sub1',
        path: '/home/sub1',
        enable: true,
        createTime: '2021-09-01 00:00:00',
        createBy: 'admin',
        updateTime: '2021-09-01 00:00:00',
        updateBy: 'admin',
        children: [
          {
            id: 111,
            title: '子菜单1-1',
            icon: 'material-symbols:subdirectory-arrow-right',
            sort: 1,
            permission: 'sys:home:sub1:sub1',
            path: '/home/sub1/sub1',
            enable: true,
            createTime: '2021-09-01 00:00:00',
            createBy: 'admin',
            updateTime: '2021-09-01 00:00:00',
            updateBy: 'admin',
          },
        ],
      },
      {
        id: 12,
        title: '子菜单2',
        icon: 'material-symbols:subdirectory-arrow-right',
        sort: 2,
        permission: 'sys:home:sub2',
        path: '/home/sub2',
        enable: true,
        createTime: '2021-09-01 00:00:00',
        createBy: 'admin',
        updateTime: '2021-09-01 00:00:00',
        updateBy: 'admin',
      },
    ],
  },
  {
    id: 2,
    title: '设置',
    icon: 'material-symbols:settings',
    sort: 2,
    permission: 'sys:settings',
    path: '/settings',
    enable: true,
    createTime: '2021-09-01 00:00:00',
    createBy: 'admin',
    updateTime: '2021-09-01 00:00:00',
    updateBy: 'admin',
    children: [
      {
        id: 21,
        title: '用户管理',
        icon: 'material-symbols:person',
        sort: 1,
        permission: 'sys:settings:user',
        path: '/settings/user',
        enable: true,
        createTime: '2021-09-01 00:00:00',
        createBy: 'admin',
        updateTime: '2021-09-01 00:00:00',
        updateBy: 'admin',
      },
      {
        id: 22,
        title: '角色管理',
        icon: 'material-symbols:group',
        sort: 2,
        permission: 'sys:settings:role',
        path: '/settings/role',
        enable: true,
        createTime: '2021-09-01 00:00:00',
        createBy: 'admin',
        updateTime: '2021-09-01 00:00:00',
        updateBy: 'admin',
      },
    ],
  },
];
</script>

<template>
  <Page>
    <div>
      <ElTable
        :data="data"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
      >
        <ElTableColumn prop="title" label="名称" />
        <ElTableColumn prop="icon" label="图标" align="center">
          <template #default="{ row }">
            <div class="flex-center gap-3">
              <IconifyIcon :icon="row.icon" />
              <ElButton size="small">选择图标</ElButton>
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="sort" label="排序" />
        <ElTableColumn prop="permission" label="权限标识" />
        <ElTableColumn prop="path" label="路径" />
        <ElTableColumn prop="enable" label="状态">
          <template #default="{ row }">
            <ElSwitch v-model="row.enable" :disabled="!row.isEditing" />
          </template>
        </ElTableColumn>
        <ElTableColumn prop="createTime" label="createTime" />
        <ElTableColumn prop="createBy" label="createBy" />
        <ElTableColumn prop="updateTime" label="updateTime" />
        <ElTableColumn prop="updateBy" label="updateBy" />
        <ElTableColumn label="操作">
          <template #default="{ row }">
            <ElButton @click="row.isEditing = !row.isEditing">
              {{ row.isEditing ? '保存' : '编辑' }}
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </Page>
</template>

<script lang="js" setup>
import { ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { ElButton, ElMessage, ElTable, ElTableColumn, ElTag } from 'element-plus';

import { ResourceType } from '#/enums/ResourceType';
import Detail from '#/views/system/resource/Detail.vue';

const data = [
  {
    id: 1,
    title: '首页',
    icon: 'material-symbols:construction',
    sort: 1,
    permission: 'sys:home',
    path: '/home',
    enable: true,
    type: 'MENU',
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
        enable: false,
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

const currentRow = ref({});

const [Modal, modalApi] = useVbenModal({
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onConfirm() {
    // MsgUtil.messageInfo('onConfirm');
    ElMessage.info('onConfirm');
    // modalApi.close();
  },
});

const handleEdit = (row) => {
  modalApi.open();
  currentRow.value = { ...row };
};
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
        <ElTableColumn prop="title" label="名称" min-width="100" />
        <ElTableColumn prop="icon" label="图标" align="center" min-width="30">
          <template #default="{ row }">
            <div class="flex-center gap-3">
              <IconifyIcon :icon="row.icon" />
            </div>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="sort" label="排序" min-width="30" />
        <ElTableColumn prop="permission" label="权限标识" min-width="80" />
        <ElTableColumn prop="path" label="路径" min-width="80" />
        <ElTableColumn prop="enable" label="状态" min-width="30">
          <template #default="{ row }">
            <ElTag :type="row.enable ? 'success' : 'danger'">启用</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="routeKey" label="路由key" min-width="80" />
        <ElTableColumn prop="type" label="类型" min-width="30">
          <template #default="{ row }">
            <ElTag :type="ResourceType[row.type]?.color">
              {{ ResourceType[row.type]?.label }}
            </ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn prop="remark" label="备注" min-width="100" />
        <ElTableColumn label="操作">
          <template #default="{ row }">
            <ElButton size="small" text type="primary" @click="handleEdit(row)">编辑</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
      <Modal title="菜单编辑">
        <Detail :resource="currentRow" />
      </Modal>
    </div>
  </Page>
</template>

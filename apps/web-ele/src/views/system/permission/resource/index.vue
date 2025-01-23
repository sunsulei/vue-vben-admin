<script lang="js" setup>
import { computed, onMounted, reactive, ref } from 'vue';

import { Page, useVbenModal } from '@vben/common-ui';
import { IconifyIcon } from '@vben/icons';

import { ElButton, ElButtonGroup, ElInput, ElTable, ElTableColumn, ElTag } from 'element-plus';

import { resourceApi } from '#/api';
import { ResourceType } from '#/enums/ResourceType';
import { MsgUtil } from '#/utils/util';
import Detail from '#/views/system/permission/resource/Detail.vue';

const resourceDetail = reactive({
  action: '',
  readonly: false,
  data: {},
});

const formApi = ref(null);
const tableData = ref([]);
const tableParam = reactive({
  loading: false,
  search: {
    path: '',
    permission: '',
  },
});

const fetchData = async () => {
  tableParam.loading = true;
  const { success, msg, data } = await resourceApi.all();
  tableParam.loading = false;
  if (!success) {
    MsgUtil.messageError(msg);
    return;
  }
  tableData.value = data;
};

onMounted(() => {
  fetchData();
});

const addOrUpdate = async (param) => {
  // 根据param的id判定是新增还是编辑
  return await (param.id ? resourceApi.update(param.id, param) : resourceApi.add(param));
};

const [Modal, modalApi] = useVbenModal({
  class: 'w-[30vw]',
  draggable: true,
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    const values = await formApi.value.formApi.getValues();
    const { enable, icon, id, iframe, keepAlive, parentId, path, permission, sort, title, type } = {
      ...resourceDetail.data,
      ...values,
      children: [],
    };

    const param = {
      id,
      enable,
      icon,
      iframe,
      keepAlive,
      parentId,
      path,
      permission,
      sort,
      title,
      type,
    };

    const { success, msg } = await addOrUpdate(param);
    if (!success) {
      MsgUtil.messageError(msg);
      return;
    }
    MsgUtil.messageSuccess('更新成功');
    modalApi.close();
    fetchData();
  },
});

const handleAdd = (param) => {
  resourceDetail.data = {
    enable: true,
    iframe: false,
    keepAlive: false,
    type: ResourceType.MENU.value,
    parentId: param?.id,
  };
  resourceDetail.readonly = false;
  resourceDetail.action = 'add';
  modalApi.open();
};

const handleEdit = (row) => {
  resourceDetail.data = { ...row, children: [] };
  resourceDetail.readonly = false;
  resourceDetail.action = 'edit';
  modalApi.open();
};

const handleView = (row) => {
  resourceDetail.data = { ...row, children: [] };
  resourceDetail.readonly = true;
  resourceDetail.action = 'view';
  modalApi.open();
};

const handleDelete = (row) => {
  MsgUtil.messageConfirm('确定要删除吗？', async () => {
    const { success, msg } = await resourceApi.delete(row.id);
    if (!success) {
      MsgUtil.messageError(msg);
      return;
    }
    MsgUtil.messageSuccess('删除成功');
    fetchData();
  });
};

const filterTreeWithPredicate = (tree, predicate) => {
  const helper = (node) => {
    if (predicate(node)) {
      // 如果节点匹配，保留其子节点及其路径
      return {
        ...node,
      };
    }
    const children = node.children?.map(helper).filter(Boolean) || [];

    if (children.length > 0) {
      // 如果子节点匹配，保留当前节点以及子节点
      return {
        ...node,
        children,
      };
    }

    // 如果都不匹配，返回 null
    return null;
  };

  return tree.map((element) => helper(element)).filter(Boolean);
};

const filterMethod = (full = '', keyword = '') =>
  full.toUpperCase().includes(keyword.toUpperCase());

const filterTableData = computed(() => {
  const { title, path, permission } = tableParam.search;

  const filters = [];
  if (title) {
    filters.push((item) => filterMethod(item.title, title));
  }
  if (path) {
    filters.push((item) => filterMethod(item.path, path));
  }

  if (permission) {
    filters.push((item) => filterMethod(item.permission, permission));
  }

  if (filters.length === 0) return tableData.value;

  const result = filterTreeWithPredicate(tableData.value, (item) =>
    filters.every((filter) => filter(item)),
  );

  return result;
});
</script>

<template>
  <Page class="h-full overflow-y-hidden">
    <div class="flex justify-between">
      <div>
        <ElButton @click="() => (tableParam.search = {})" type="danger">重置筛选</ElButton>
        <ElButton @click="fetchData">获取数据</ElButton>
      </div>
      <div>
        <ElButton @click="handleAdd" type="primary">新增资源</ElButton>
      </div>
    </div>
    <ElTable
      class="mt-2"
      :data="filterTableData"
      height="80vh"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      v-loading="tableParam.loading"
      default-expand-all
    >
      <ElTableColumn prop="title" label="名称" class-name="title">
        <template #header="{ column }">
          <div class="flex w-full items-center justify-between">
            <span class="w-[80px]">{{ column.label }}</span>
            <ElInput
              v-model="tableParam.search[column.property]"
              clearable
              :placeholder="`请输入${column.label}`"
            />
          </div>
        </template>
        <template #default="{ row }">
          <div class="flex w-full items-center justify-between">
            <div class="flex items-center">
              <IconifyIcon :icon="row.icon" />
              <span class="ml-1">{{ row.title }}</span>
            </div>
            <ElTag v-if="row.keepAlive" size="small" type="success" class="ml-1">缓存</ElTag>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="sort" label="排序" min-width="30" />
      <ElTableColumn prop="permission" label="权限标识">
        <template #header="{ column }">
          <div class="flex w-full items-center justify-between">
            <span class="w-[80px]">{{ column.label }}</span>
            <ElInput
              v-model="tableParam.search[column.property]"
              clearable
              :placeholder="`请输入${column.label}`"
            />
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="path" label="路径">
        <template #header="{ column }">
          <div class="flex w-full items-center justify-between">
            <span class="w-[80px]">{{ column.label }}</span>
            <ElInput
              v-model="tableParam.search[column.property]"
              clearable
              :placeholder="`请输入${column.label}`"
            />
          </div>
        </template>
        <template #default="{ row }">
          <div class="flex items-center justify-between">
            <span>{{ row.path }}</span>
            <ElTag v-if="row.iframe" size="small" type="success" class="ml-1">网页</ElTag>
          </div>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="enable" label="状态" min-width="30" align="center" width="80">
        <template #default="{ row }">
          <ElTag :type="row.enable ? 'success' : 'danger'">
            {{ row.enable ? '启用' : '禁用' }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn prop="type" label="类型" min-width="30" align="center" width="80">
        <template #default="{ row }">
          <ElTag :type="ResourceType[row.type]?.color">
            {{ ResourceType[row.type]?.label }}
          </ElTag>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" width="230" fixed="right" align="center">
        <template #default="{ row }">
          <ElButton size="small" @click="handleAdd(row)">增加子级</ElButton>
          <ElButtonGroup class="ml-2">
            <ElButton size="small" @click="handleView(row)">
              <IconifyIcon icon="mdi:eye" />
            </ElButton>
            <ElButton size="small" @click="handleEdit(row)">
              <IconifyIcon icon="mdi:pencil" />
            </ElButton>
            <ElButton size="small" @click="handleDelete(row)">
              <IconifyIcon icon="mdi:delete" class="text-red-500" />
            </ElButton>
          </ElButtonGroup>
        </template>
      </ElTableColumn>
    </ElTable>
    <Modal title="菜单编辑">
      <Detail
        ref="formApi"
        :readonly="resourceDetail.readonly"
        :detail="resourceDetail.data"
        :resources="tableData"
      />
    </Modal>
  </Page>
</template>
<style lang="less" scoped>
:deep(.title .cell) {
  display: inline-flex;
  align-items: center;
  width: 100%;
}
</style>

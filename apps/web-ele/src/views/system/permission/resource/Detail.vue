<script lang="js" setup>
import { computed, h, nextTick, onMounted, ref, watch } from 'vue';

import { IconPicker, Page } from '@vben/common-ui';

import { ElCheckbox } from 'element-plus';

import { useVbenForm } from '#/adapter/form';
import { ResourceType } from '#/enums/ResourceType';

const { readonly, detail, resources } = defineProps({
  readonly: {
    type: Boolean,
    required: true,
    default: false,
  },
  detail: {
    type: Object,
    required: true,
  },
  resources: {
    type: Array,
    required: true,
  },
});

const tempFormData = ref({ ...detail });

const allResource = computed(() => {
  const format = (arr) => {
    return arr.map((item) => ({
      value: `${item.id}`,
      label: item.title,
      children: item.children ? format(item.children) : [],
    }));
  };

  const root = {
    value: '0',
    label: '根节点',
    children: format(resources),
  };
  return [root];
});

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  handleValuesChange: (values) => {
    tempFormData.value = { ...values };
  },
  commonConfig: { disabled: readonly },
  schema: [
    {
      component: 'TreeSelect',
      fieldName: 'parentId',
      label: '上级资源',
      componentProps: {
        allowClear: true,
        placeholder: '请选择上级资源',
        showSearch: true,
        checkStrictly: true,
        defaultValue: detail.parentId,
        defaultExpandAll: true,
        data: allResource.value,
      },
    },
    {
      component: 'RadioGroup',
      fieldName: 'type',
      label: '资源类型',
      componentProps: {
        isButton: true,
        options: Object.keys(ResourceType).map((key) => ({
          value: key,
          label: ResourceType[key].label,
        })),
      },
    },
    {
      component: 'Input',
      fieldName: 'title',
      label: '名称',
      renderComponentContent: (obj) => ({
        prepend: h(IconPicker, {
          prefix: 'mdi',
          modelValueProp: 'model-value',
          modelValue: obj.icon,
          readonly,
          onChange: (v) => formApi.setFieldValue('icon', v),
        }),
        append: h(ElCheckbox, {
          modelValue: obj.keepAlive,
          disabled: readonly,
          label: '缓存',
          onChange: (v) => formApi.setFieldValue('keepAlive', v),
        }),
      }),
    },
    {
      component: 'Input',
      fieldName: 'path',
      label: '路径',
      renderComponentContent: (obj) => {
        if (obj.type === ResourceType.PAGE.value) {
          return {
            append: h(ElCheckbox, {
              modelValue: obj.iframe,
              disabled: readonly,
              label: '外部',
              onChange: (v) => formApi.setFieldValue('iframe', v),
            }),
          };
        }
        return {};
      },
    },
    {
      component: 'Input',
      fieldName: 'icon',
      dependencies: { show: false, triggerFields: ['type'] },
    },
    {
      component: 'Switch',
      fieldName: 'iframe',
      dependencies: { show: false, triggerFields: ['type'] },
    },
    {
      component: 'Switch',
      fieldName: 'keepAlive',
      dependencies: { show: false, triggerFields: ['type'] },
    },
    { component: 'Input', fieldName: 'permission', label: '授权标识' },
    { component: 'InputNumber', fieldName: 'sort', label: '排序' },
    { component: 'Switch', fieldName: 'enable', label: '状态' },
  ],
  // 大屏一行显示3个，中屏一行显示2个，小屏一行显示1个
  wrapperClass: 'grid-cols-1',
});

const findItem = (arr, id) => {
  for (const item of arr) {
    if (item.id === id) return item;
    if (item.children) {
      const result = findItem(item.children, id);
      if (result) return result;
    }
  }
};

const changeParentIdToBuildParam = (parentId, overwrite = false) => {
  const item = findItem(resources, parentId);
  if (item) {
    const needWrite = (attr) => {
      if (!attr) return true;
      if (overwrite) return true;
      return false;
    };

    setTimeout(() => {
      const { path, permission, sort } = tempFormData.value;

      needWrite(path) && formApi.setFieldValue('path', `${item.path}/`);
      needWrite(permission) && formApi.setFieldValue('permission', `${item.permission}:`);
      needWrite(sort) &&
        formApi.setFieldValue('sort', item.sort * 10 + item.children.length * 10 + 1);
    }, 1);
  }
};

watch(
  () => tempFormData.value.parentId,
  (parentId) => {
    changeParentIdToBuildParam(parentId, true);
  },
);

onMounted(() =>
  nextTick(() => {
    formApi.setValues(detail);

    if (detail.parentId) {
      changeParentIdToBuildParam(detail.parentId);
    }
  }),
);

// 对外暴露formApi
defineExpose({
  formApi,
});
</script>

<template>
  <Page>
    <div>
      <Form />
    </div>
  </Page>
</template>

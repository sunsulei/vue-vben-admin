import type { ComponentRecordType, GenerateMenuAndRoutesOptions } from '@vben/types';

import { generateAccessible } from '@vben/access';
import { preferences } from '@vben/preferences';

import { ElMessage } from 'element-plus';

import { resourceApi } from '#/api';
import { ResourceType } from '#/enums/ResourceType';
import { BasicLayout, IFrameView } from '#/layouts';
import { $t } from '#/locales';

const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  };

  const buildMenuList = async (menuTree = []) => {
    const buildNode = (node: any) => {
      const { children, ...other } = node;

      const menuNode = {
        meta: {
          icon: other.icon,
          KeepAlive: other.keepAlive,
          order: other.sort,
          title: other.title,
        },
        name: `${other.permission}-${other.id}`,
        path: other.path,
      };

      if (other.type === ResourceType.PAGE.value) {
        menuNode.component = `${other.path}/index.vue`;
      }

      if (other.iframe) {
        menuNode.meta.iframeSrc = other.path;
        menuNode.path = other.title;
      }

      if (other.type === ResourceType.BUTTON.value) {
        menuNode.meta.link = other.path;
      }

      return {
        ...menuNode,
        children: children.filter((e) => e.enable).map((element) => buildNode(element)),
      };
    };

    return menuTree
      .filter((e) => e.enable)
      .map((e) => ({ ...buildNode(e), component: 'BasicLayout' }));
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      ElMessage({
        duration: 1500,
        message: `${$t('common.loadingMenu')}...`,
      });

      const { success, msg, data } = await resourceApi.all();
      if (!success) {
        ElMessage.error(msg);
        return [];
      }
      return buildMenuList(data);
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };

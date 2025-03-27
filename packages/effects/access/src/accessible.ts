import type { AccessModeType, GenerateMenuAndRoutesOptions, RouteRecordRaw } from '@vben/types';

import {
  cloneDeep,
  generateMenus,
  generateRoutesByBackend,
  generateRoutesByFrontend,
  mapTree,
} from '@vben/utils';

async function generateAccessible(mode: AccessModeType, options: GenerateMenuAndRoutesOptions) {
  const { router } = options;

  options.routes = cloneDeep(options.routes);
  // 生成路由
  const accessibleRoutes = await generateRoutes(mode, options);

  // 动态添加到router实例内
  accessibleRoutes.forEach((route) => {
    router.addRoute(route);
  });

  // 生成菜单
  const accessibleMenus = await generateMenus(accessibleRoutes, options.router);

  return { accessibleMenus, accessibleRoutes };
}

function mergeNodes(nodes1: any, nodes2: any) {
  const map = new Map();

  // 先将 tree1 的节点加入 map
  for (const node of nodes1) {
    map.set(node.path, { ...node });
  }

  // 用 tree2 的节点覆盖 tree1
  for (const node of nodes2) {
    if (map.has(node.path)) {
      // 如果路径相同，合并子节点
      const existingNode = map.get(node.path);
      map.set(node.path, {
        ...node,
        children: mergeNodes(existingNode.children || [], node.children || []),
      });
    } else {
      map.set(node.path, { ...node });
    }
  }

  return [...map.values()];
}

/**
 * Generate routes
 * @param mode
 * @param options
 */
async function generateRoutes(mode: AccessModeType, options: GenerateMenuAndRoutesOptions) {
  const { forbiddenComponent, roles, routes } = options;

  let resultRoutes: RouteRecordRaw[] = routes;
  switch (mode) {
    case 'backend': {
      const backendRoutes = await generateRoutesByBackend(options);
      resultRoutes = mergeNodes(resultRoutes, backendRoutes);
      break;
    }
    case 'frontend': {
      resultRoutes = await generateRoutesByFrontend(routes, roles || [], forbiddenComponent);
      break;
    }
  }

  /**
   * 调整路由树，做以下处理：
   * 1. 对未添加redirect的路由添加redirect
   */
  resultRoutes = mapTree(resultRoutes, (route) => {
    // 如果有redirect或者没有子路由，则直接返回
    if (route.redirect || !route.children || route.children.length === 0) {
      return route;
    }
    const firstChild = route.children[0];

    // 如果子路由不是以/开头，则直接返回,这种情况需要计算全部父级的path才能得出正确的path，这里不做处理
    if (!firstChild?.path || !firstChild.path.startsWith('/')) {
      return route;
    }

    route.redirect = firstChild.path;
    return route;
  });

  return resultRoutes;
}

export { generateAccessible };

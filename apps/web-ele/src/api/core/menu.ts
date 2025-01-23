import type { RouteRecordStringComponent } from '@vben/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>('/system/resource');
}

export const resourceApi = {
  update: (id: string, data: any) => requestClient.put(`/system/resource/${id}`, data),
  add: (data: any) => requestClient.post(`/system/resource`, data),
  delete: (id: string) => requestClient.delete(`/system/resource/${id}`),
  all: () => requestClient.get<RouteRecordStringComponent[]>('/system/resource'),
};

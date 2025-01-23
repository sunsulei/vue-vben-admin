import { defineOverridesPreferences } from '@vben/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  app: {
    layout: 'sidebar-mixed-nav',
    name: '主数据管理平台',
    accessMode: 'backend',
    enableCheckUpdates: false,
  },
  logo: {
    source:
      'https://static.fat.ennew.com/ennew/mdm/frontend/mdm-web/master/img/ennew-logo-new.8dbeeb49.png',
  },
  breadcrumb: {
    hideOnlyOne: true,
    showIcon: false,
  },
  copyright: {
    icp: '123',
    icpLink: '321',
  },
  footer: {
    enable: true,
    fixed: true,
  },
  shortcutKeys: {
    globalLockScreen: false,
    globalLogout: false,
    globalSearch: false,
  },
  sidebar: {
    autoActivateChild: true,
    width: 200,
  },
  tabbar: {
    enable: false,
    showMore: false,
    styleType: 'card',
  },
  theme: {
    mode: 'light',
  },
  widget: {
    languageToggle: false,
    lockScreen: false,
  },
  navigation: {
    accordion: false,
  },
});

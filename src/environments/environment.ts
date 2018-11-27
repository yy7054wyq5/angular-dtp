// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

// 此为开发环境配置参考，在本地开发时需有environment.ts并修改apiHost为相应的接口地址
import { VERSION } from './version';

export const environment = {
  production: false,
  hmr: false,
  version: 'development ' + VERSION.tag,
  staticHost: '',
  apiHost: '',
  demoRoutes: [
    {
      id: 'd0',
      label: 'demo module',
      children: [
        {
          id: 'd01',
          label: 'demo',
          children: [
            {
              id: 'd02',
              label: 'List',
              url: '/demo/list'
            },
            {
              id: 'd02',
              label: 'Add',
              url: '/demo/add'
            },
            {
              id: 'd03',
              label: 'Full Calendar',
              url: '/demo/full-calendar'
            },
            {
              id: 'd04',
              label: 'Temporary',
              url: '/demo/temporary'
            }
          ]
        }
      ]
    }
  ]
};

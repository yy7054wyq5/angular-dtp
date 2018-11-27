import { VERSION } from './version';

export const environment = {
  production: true,
  hmr: false,
  version: 'maitrox-test ' + VERSION.tag,
  apiHost: '//academy.maitrox.com:36881',
  staticHost: '',
  demoRoutes: []
};

import {
  Server,
} from './';

export default {
  path: '/',
  name: 'Server',
  childRoutes: [
    { path: 'server',
      name: 'Server',
    },
  ],
};

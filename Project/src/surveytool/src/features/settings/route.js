// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Settings,
} from './';

export default {
  path: '/',
  name: 'Settings',
  childRoutes: [
    { path: 'settings', name: 'Settings', component: Settings, isIndex: true },
  ],
};

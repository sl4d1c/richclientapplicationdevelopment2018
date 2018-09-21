// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ResetPassword,
} from './';

export default {
  path: '/',
  name: 'Reset password',
  childRoutes: [
    { path: 'reset-password', name: 'Reset password', component: ResetPassword, isIndex: true },
  ],
};

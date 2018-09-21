// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Survey,
} from './';

export default {
  path: '/',
  name: 'Survey',
  childRoutes: [
    { path: 'survey', name: 'Survey', component: Survey, isIndex: true },
  ],
};

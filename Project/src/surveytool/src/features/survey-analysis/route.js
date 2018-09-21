// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Analysis,
} from './';

export default {
  path: '/',
  name: 'Survey analysis',
  childRoutes: [
    { path: 'survey-analysis', name: 'Analysis', component: Analysis, isIndex: true },
  ],
};

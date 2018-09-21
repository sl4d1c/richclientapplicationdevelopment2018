// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  MySurveys,
} from './';

export default {
  path: '/',
  name: 'My surveys',
  childRoutes: [
    { path: 'my-surveys', name: 'My surveys', component: MySurveys, isIndex: true },
  ],
};

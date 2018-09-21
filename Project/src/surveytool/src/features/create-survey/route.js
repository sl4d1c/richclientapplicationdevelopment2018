// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  CreateSurvey,
} from './';

export default {
  path: '/',
  name: 'Create survey',
  childRoutes: [
    { path: 'create-survey', name: 'Create survey', component: CreateSurvey, isIndex: true },
  ],
};
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import resetPasswordReducer from '../features/reset-password/redux/reducer';
import createSurveyReducer from '../features/create-survey/redux/reducer';
import settingsReducer from '../features/settings/redux/reducer';
import mySurveysReducer from '../features/my-surveys/redux/reducer';
import surveyReducer from '../features/survey/redux/reducer';
import surveyAnalysisReducer from '../features/survey-analysis/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage theme.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  resetPassword: resetPasswordReducer,
  createSurvey: createSurveyReducer,
  settings: settingsReducer,
  mySurveys: mySurveysReducer,
  survey: surveyReducer,
  surveyAnalysis: surveyAnalysisReducer,
};

export default combineReducers(reducerMap);

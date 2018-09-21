import React from 'react';
import { shallow } from 'enzyme';
import { Question } from '../../../src/features/create-survey';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Question />);
  expect(renderedComponent.find('.create-survey-question').length).toBe(1);
});

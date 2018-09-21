import React from 'react';
import { shallow } from 'enzyme';
import { MultipleChoice } from '../../../src/features/survey';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<MultipleChoice />);
  expect(renderedComponent.find('.survey-multiple-choice').length).toBe(1);
});

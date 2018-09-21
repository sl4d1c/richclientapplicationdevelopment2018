import React from 'react';
import { shallow } from 'enzyme';
import { Checkboxes } from '../../../src/features/survey';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Checkboxes />);
  expect(renderedComponent.find('.survey-checkboxes').length).toBe(1);
});

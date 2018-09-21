import React from 'react';
import { shallow } from 'enzyme';
import { Text } from '../../../src/features/survey';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Text />);
  expect(renderedComponent.find('.survey-text').length).toBe(1);
});

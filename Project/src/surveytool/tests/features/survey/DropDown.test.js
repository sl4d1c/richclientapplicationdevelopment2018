import React from 'react';
import { shallow } from 'enzyme';
import { DropDown } from '../../../src/features/survey';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<DropDown />);
  expect(renderedComponent.find('.survey-drop-down').length).toBe(1);
});

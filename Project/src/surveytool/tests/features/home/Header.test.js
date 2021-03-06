import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Header />);
  expect(renderedComponent.find('.home-header').length).toBe(1);
});

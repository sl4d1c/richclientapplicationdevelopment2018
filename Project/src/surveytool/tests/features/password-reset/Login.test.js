import React from 'react';
import { shallow } from 'enzyme';
import { Login } from '../../../src/features/password-reset/Login';

describe('password-reset/Login', () => {
  it('renders node with correct class name', () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Login {...props} />
    );

    expect(
      renderedComponent.find('.password-reset-login').length
    ).toBe(1);
  });
});

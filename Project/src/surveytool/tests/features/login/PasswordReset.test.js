import React from 'react';
import { shallow } from 'enzyme';
import { PasswordReset } from '../../../src/features/login/PasswordReset';

describe('login/PasswordReset', () => {
  it('renders node with correct class name', () => {
    const props = {
      login: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <PasswordReset {...props} />
    );

    expect(
      renderedComponent.find('.login-password-reset').length
    ).toBe(1);
  });
});

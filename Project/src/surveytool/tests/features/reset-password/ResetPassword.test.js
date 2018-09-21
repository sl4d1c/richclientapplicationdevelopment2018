import React from 'react';
import { shallow } from 'enzyme';
import { ResetPassword } from '../../../src/features/reset-password/ResetPassword';

describe('reset-password/ResetPassword', () => {
  it('renders node with correct class name', () => {
    const props = {
      resetPassword: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <ResetPassword {...props} />
    );

    expect(
      renderedComponent.find('.reset-password-reset-password').length
    ).toBe(1);
  });
});

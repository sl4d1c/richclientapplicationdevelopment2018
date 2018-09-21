import React from 'react';
import { shallow } from 'enzyme';
import { Settings } from '../../../src/features/settings/Settings';

describe('settings/Settings', () => {
  it('renders node with correct class name', () => {
    const props = {
      settings: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Settings {...props} />
    );

    expect(
      renderedComponent.find('.settings-settings').length
    ).toBe(1);
  });
});

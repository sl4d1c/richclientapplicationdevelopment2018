import React from 'react';
import { shallow } from 'enzyme';
import { MySurveys } from '../../../src/features/my-surveys/MySurveys';

describe('my-surveys/MySurveys', () => {
  it('renders node with correct class name', () => {
    const props = {
      mySurveys: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <MySurveys {...props} />
    );

    expect(
      renderedComponent.find('.my-surveys-my-surveys').length
    ).toBe(1);
  });
});

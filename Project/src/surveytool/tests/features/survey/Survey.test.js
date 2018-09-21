import React from 'react';
import { shallow } from 'enzyme';
import { Survey } from '../../../src/features/survey/Survey';

describe('survey/Survey', () => {
  it('renders node with correct class name', () => {
    const props = {
      survey: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Survey {...props} />
    );

    expect(
      renderedComponent.find('.survey-survey').length
    ).toBe(1);
  });
});

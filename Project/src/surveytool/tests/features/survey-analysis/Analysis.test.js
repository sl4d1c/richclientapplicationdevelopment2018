import React from 'react';
import { shallow } from 'enzyme';
import { Analysis } from '../../../src/features/survey-analysis/Analysis';

describe('survey-analysis/Analysis', () => {
  it('renders node with correct class name', () => {
    const props = {
      surveyAnalysis: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Analysis {...props} />
    );

    expect(
      renderedComponent.find('.survey-analysis-analysis').length
    ).toBe(1);
  });
});

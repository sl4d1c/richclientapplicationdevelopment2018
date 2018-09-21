import React from 'react';
import { shallow } from 'enzyme';
import { CreateSurvey } from '../../../src/features/create-survey/CreateSurvey';

describe('create-survey/CreateSurvey', () => {
  it('renders node with correct class name', () => {
    const props = {
      createSurvey: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <CreateSurvey {...props} />
    );

    expect(
      renderedComponent.find('.create-survey-create-survey').length
    ).toBe(1);
  });
});

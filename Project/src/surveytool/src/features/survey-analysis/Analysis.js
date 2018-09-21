import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header} from './index';

import {RadialChart} from 'react-vis';

let id = 0;

function createDataOneQuestion(question, possibleAnswers, answer, type) {
  id += 1;
  return { id, question, possibleAnswers, answer, type };
}

function createData(titel, answers){
  return {titel, answers};
}

const data_on_answer1 = [
  createDataOneQuestion('Do you like Drop Down?', ['yes', 'no', 'maybe'], ['yes']),
  createDataOneQuestion('Do you like Checkbox?', ['yes', 'no', 'maybe'], ['yes']),
  createDataOneQuestion('Do you like Text?', [], [], 'text'),
  createDataOneQuestion('Do you like Multiple Choice?', ['yes', 'no', 'maybe'], ['yes']),
];


const data_on_answer2 = [
  createDataOneQuestion('Do you like Drop Down?', ['yes', 'no', 'maybe'], ['no']),
  createDataOneQuestion('Do you like Checkbox?', ['yes', 'no', 'maybe'], ['no']),
  createDataOneQuestion('Do you like Text?', [], [], 'text'),
  createDataOneQuestion('Do you like Multiple Choice?', ['yes', 'no', 'maybe'], ['yes']),
];

const allAnswers = createData('Your opinion on stuff', [data_on_answer1, data_on_answer2]);

export class Analysis extends Component {
  static propTypes = {
    surveyAnalysis: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };


  createOutput = (answerArray) => {
    let answersFormatted = [];
    let count = 0;

    for(let i = 0; i < answerArray.length; i++){
      alert(answerArray[i][count].question);
    }

    //So muss das nachher aussehen, angle ist der anteil und lable ist was dran steht
    answersFormatted = [
      {angle: 6, label: "derp"}, 
      {angle: 5},
      {angle: 2}
    ];
    return answersFormatted;
  }

  render() {
    return (
      
      <div style={{ height: '100%', width: '100%', backgroundColor: '#3366ff', position: 'fixed' }}>
      <link rel="stylesheet" href="https://unpkg.com/react-vis/dist/style.css"></link>
        <Header />
        <div
          style={{
            height: '100%',
            width: '60%',
            backgroundColor: '#ffffff',
            position: 'fixed',
            marginLeft: '20%',
          }}
        >
          <div style={{height: '86%', width: '60%', position: 'fixed', overflow: 'auto'}}>
            <h1>{allAnswers.titel}</h1>
            <h2>{allAnswers.answers.question}</h2>
            <RadialChart
              width={300}
              height={300}
              showLabels={true}
              data={this.createOutput(allAnswers.answers)}>
          </RadialChart>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    surveyAnalysis: state.surveyAnalysis,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Analysis);

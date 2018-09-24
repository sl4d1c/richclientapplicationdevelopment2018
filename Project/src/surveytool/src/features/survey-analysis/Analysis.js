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

//const allAnswers = createData('Your opinion on stuff', [data_on_answer1, data_on_answer2]);

export class Analysis extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
        title:'',
        isLoading: true,

    }
  }

    componentDidMount() {
        let url = window.location.href;
        let urlArray = url.split('=');
        let surveyId = urlArray[1];
        fetch('/api/survey/getAnsweredSurvey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                surveyId: surveyId
            })
        })
            .then(res =>  res.json())
            .then(json => {
                if (json.success) {
                    this.setState({
                        data: json.data,
                        title: json.title,
                        isLoading: false
                    });
                }});
        console.log('fetched data => ', this.state.data);
        //console.log('static class data => ', allAnswers);
    }

  static propTypes = {
    surveyAnalysis: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

    singleAnswerForQuestion = (answerArray, index) => {
        let answersUnformatted = [];
        let result = [];
        let possibleAnswers = answerArray[0][index].possibleAnswers;
        for(let i = 0; i < answerArray.length; i++){
            console.log("count: " + index + " i: " + i + " " + answerArray[i][index].question + " " + answerArray[i][index].answers);
            let answerName = answerArray[i][index].answers[0];
            answersUnformatted.push(answerName);
            //Die question hinten einfach an answersUnformatted hängen
            if((answerArray.length - 1) === i){
                answersUnformatted.push(answerArray[i][index].question);
            }
        }
        console.log(answersUnformatted);
        let formatted = this.format(answersUnformatted, possibleAnswers);
        console.log(formatted);
        result['question'] = answersUnformatted[answersUnformatted.length - 1];
        result['answers'] = formatted;

        return result;
        //return formatted;
    };


    format = (unformatted, possibleAnswers) => {
        let formatted = [];

        var count = (input, arr) => arr.filter(x => x === input).length;
        //question wird vom count ignoriert - wie weiter?
        for (let i = 0; i < possibleAnswers.length; i++) {
            if(count(possibleAnswers[i], unformatted) !== 0){
                formatted.push({ angle: count(possibleAnswers[i], unformatted), label: unformatted[i] });
            }
        }
        return formatted;
    }

    allCakeData = (answerArray) => {
        let allCakeData = [];

        for(let index = 0; index < answerArray[0].length; index++) {
            allCakeData.push(this.singleAnswerForQuestion(this.state.data, index));
            console.log("----");

        }

        console.log(allCakeData);
        return allCakeData;
    }

  render() {
        if (this.state.isLoading) {
            return (<div>loading ...</div>);
        } else {
            let cakes = this.allCakeData(this.state.data).map(data => {
                if(data.answers.length > 0) {
                    return (
                        <div>
                            <h2>{data.question}</h2>
                            <RadialChart
                                width={300}
                                height={300}
                                showLabels={true}
                                data={data.answers}>
                            </RadialChart>
                        </div>
                    );
                } else {
                    return (<div></div>);
                }
            });
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
                            <h1>{this.state.titel}</h1>
                            {cakes}
                        </div>
                    </div>
                </div>
            );
        }
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header} from './index';

import {RadialChart} from 'react-vis';

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
    }

  static propTypes = {
    surveyAnalysis: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

    singleAnswerForQuestion = (answerArray, index) => {
        let answersUnformatted = [];
        let result = [];
        let possibleAnswers = answerArray[0][index].possibleAnswers;
        let question = '';

        for(let i = 0; i < answerArray.length; i++){
            console.log("count: " + index + " i: " + i + " " + answerArray[i][index].question + " " + answerArray[i][index].answers);

            let answers = answerArray[i][index].answers;
            for (let j=0; j < answers.length; j++) {
                answersUnformatted.push(answers[j]);
            }

            //Die question wird beim letzen Durchgang gesetzt
            if((answerArray.length - 1) === i){
                question = answerArray[i][index].question;
            }
        }
        console.log(answersUnformatted);
        let formatted = this.format(answersUnformatted, possibleAnswers);
        console.log(formatted);

        result['question'] = question;
        result['answers'] = formatted;

        return result;
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
    };

    allCakeData = (answerArray) => {
        let allCakeData = [];

        for(let index = 0; index < answerArray[0].length; index++) {
            allCakeData.push(this.singleAnswerForQuestion(this.state.data, index));
            console.log("----");
        }

        console.log(allCakeData);
        return allCakeData;
    };

  render() {
        if (this.state.isLoading) {
            return (
                <div style={{ height: '100%', width: '100%', backgroundColor: '#3366ff', position: 'fixed' }}>
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
                            is loading ...
                        </div>
                    </div>
                </div>
            );
        } else {
            if (!this.state.data.length) {
                return(
                    <div style={{ height: '100%', width: '100%', backgroundColor: '#3366ff', position: 'fixed' }}>
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
                                There is no data yet!
                            </div>
                        </div>
                    </div>
                );
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header, DropDown, Checkboxes, MultipleChoice, Text } from './index';

import Button from '@material-ui/core/Button';

export class Survey extends Component {

    constructor() {
        super();
        this.state = {
            currentIndex: 1,
            id: 1,
            submitData:[],
            title: '',
            data: [],
            isLoading: true,
            surveyId: ''
        };
    };
  static propTypes = {
    survey: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
      let url = window.location.href;
      let urlArray = url.split('=');
      let _id = urlArray[1];

      console.log('id => ', _id);
      fetch('/api/survey/getSurvey?_id=' + _id)
          .then(res =>  res.json())
          .then(json => {
              if (json.success) {
                  this.setState({
                      data: json.data,
                      title: json.title,
                      isLoading: false,
                      surveyId: _id
                  });
              }});
  };

  increaseCurrentIndex = () => {
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  decreaseCurrentIndex = () => {
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  };

    onAddData = (question, possibleAnswers, answers) => {
      let result = {
          id: this.state.id,
          question: question,
          possibleAnswers: possibleAnswers,
          answers: answers
      };

      this.setState({
          id: this.state.id++,
          submitData: [...this.state.submitData, result]
      });
    };

  finishSurvey = () => {
      if (this.state.surveySaved) {
          alert('You already answered this survey!');
          return;
      }
    const {
        submitData,
        title,
        surveyId
    } = this.state;

    // Post request to backend
      fetch('/api/answeredSurvey/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title: title,
              data: submitData,
              surveyId: surveyId
          })
      }).then(res => res.json())
          .then(json => {
              console.log('json', json);
              if (json.success) {
                  this.setState({
                      surveySaveError: json.message,
                      surveySaved: true
                  });
                  alert('Your survey was saved, thank you very much!');
              } else {
                  this.setState({
                      surveySaveError: json.message,
                  });
              }
          })
  };

  render() {
      if (this.state.isLoading) {
          return(<div> is loading ...</div>)
      } else {
          let addedQuestionsGoHere = this.state.data.map(data => {
              return (
                  <div>
                      {data.type === 'Drop Down' && this.state.currentIndex === data.id ? (
                          <div style={{ marginTop: '2%' }}>
                              <DropDown question={data.question} answers={data.answers} setData={this.onAddData}/>
                          </div>
                      ) : (
                          <div />
                      )}
                      {data.type === 'Checkbox' && this.state.currentIndex === data.id ? (
                          <div style={{ marginTop: '2%' }}>
                              <Checkboxes question={data.question} answers={data.answers} setData={this.onAddData} />
                          </div>
                      ) : (
                          <div />
                      )}
                      {data.type === 'Text' && this.state.currentIndex === data.id ? (
                          <div style={{ marginTop: '2%' }}>
                              <Text question={data.question} setData={this.onAddData} />
                          </div>
                      ) : (
                          <div />
                      )}
                      {data.type === 'Multiple Choice' && this.state.currentIndex === data.id ? (
                          <div style={{ marginTop: '2%' }}>
                              <MultipleChoice question={data.question} answers={data.answers} setData={this.onAddData} />
                          </div>
                      ) : (
                          <div />
                      )}
                  </div>
              );
          });
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
                      <div style={{ marginLeft: '5%', marginRight: '5%' }}>
                          {this.state.title}
                          {addedQuestionsGoHere}

                          {this.state.currentIndex === 1 ? (
                              <Button
                                  onClick={this.increaseCurrentIndex}
                                  variant="contained"
                                  color="primary"
                                  style={{ marginTop: '2%' }}
                              >
                                  Next
                              </Button>
                          ) : (
                              <div />
                          )}
                          {this.state.currentIndex > 1 && this.state.currentIndex < this.state.data.length ? (
                              <div>
                                  <Button
                                      onClick={this.increaseCurrentIndex}
                                      variant="contained"
                                      color="primary"
                                      style={{ marginTop: '2%' }}
                                  >
                                      Next
                                  </Button>
                                  <Button
                                      onClick={this.decreaseCurrentIndex}
                                      variant="contained"
                                      color="primary"
                                      style={{ marginTop: '2%', marginLeft: '2%' }}
                                  >
                                      Back
                                  </Button>
                              </div>
                          ) : (
                              <div />
                          )}
                          {this.state.currentIndex === this.state.data.length ? (
                              <div>
                                  <Button
                                      onClick={this.decreaseCurrentIndex}
                                      variant="contained"
                                      color="primary"
                                      style={{ marginTop: '2%' }}
                                  >
                                      Back
                                  </Button>
                                  <Button
                                      onClick={this.finishSurvey}
                                      variant="contained"
                                      color="primary"
                                      style={{ marginTop: '2%', marginLeft: '2%'}}
                                  >
                                      Finish
                                  </Button>
                              </div>
                          ) : (
                              <div />
                          )}
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
    survey: state.survey,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Survey);

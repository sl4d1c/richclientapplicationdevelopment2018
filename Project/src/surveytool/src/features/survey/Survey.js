import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header, DropDown, Checkboxes, MultipleChoice, Text } from './index';

import Button from '@material-ui/core/Button';

let id = 0;

function createData(question, type, answers) {
  id += 1;
  return { id, question, type, answers };
}

const data_bak = [
  createData('Do you like Drop Down?', 'Drop Down', ['yes', 'no', "Don't know"]),
  createData('Do you like Checkbox?', 'Checkbox', ['yes', 'no', 'maybe']),
  createData('Do you like Text?', 'Text', ['yes', 'no']),
  createData('Do you like Multiple Choice?', 'Multiple Choice', ['yes', 'no', 'maybe']),
];

export class Survey extends Component {

    constructor() {
        super();
        this.state = {
            currentIndex: 1,
            id: 1,
            submitData:[],
            title: '',
            data: [],
            isLoading: true
        };
    };
    /*
    state= {
      data:[],
      currentIndex: 1,
      id: 1,
      submitData:[],
      title: ''
  };
*/
  static propTypes = {
    survey: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount() {
      /*fetch('/api/survey/getSurvey', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            _id: '5b9964dfdf1ff92ad23a88d0'
          })
      })
          .then(res =>  res.json())
          .then(json => {
              if (json.success) {
                  this.setState({
                      data: json.data,
                      title: json.title
                  });
          }});*/
      let url = window.location.href;
      let urlArray = url.split('=');
      let _id = urlArray[1];
      let title = '';
      let data = [];

      console.log('id => ', _id);
      fetch('/api/survey/getSurvey?_id=' + _id)
          .then(res =>  res.json())
          .then(json => {
              if (json.success) {
                  this.setState({
                      data: json.data,
                      title: json.title,
                      isLoading: false
                  });
              }});
      //this.fillData(title, data);
      console.log('fetched data => ', data);
      console.log('static class data => ', data_bak);
      //this.getData();

  };

  getData = async () => {

  };

  fillData = (title, data) => {
      this.setState({
          data: data,
          title: title,
          isLoading: false
      });
  };
  /*
  state = {
    currentIndex: 1,
  };
  */

  increaseCurrentIndex = () => {
    this.setState({ currentIndex: this.state.currentIndex + 1 });
  };

  decreaseCurrentIndex = () => {
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  };
  loadDb = () => {
      fetch('/api/survey/getSurvey', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              _id: '5b9964dfdf1ff92ad23a88d0'
          })
      })
          .then(res => res.json())
          .then(json => {
              if (json.success) {
                  this.setState({
                      data: json.data,
                      title: json.title
                  });
              }});
      console.log('from go => ',this.state.data)
  };
    go = () => {
      this.loadDb();
      console.log('static data => ',data_bak);
    };

    onAddData = (question, answers) => {
      let result = {
          id: this.state.id,
          question: question,
          answers: answers
      };

      this.setState({
          id: id++,
          submitData: [...this.state.submitData, result]
      });
    };

  finishSurvey = () => {
    const {
        submitData,
        title
    } = this.state;

    // Post request to backend
      fetch('/api/answeredSurvey/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              title: title,
              data: submitData
          })
      }).then(res => res.json())
          .then(json => {
              console.log('json', json);
              if (json.success) {
                  this.setState({
                      surveySaveError: json.message,
                      surveySaved: true
                  });
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

                          {this.state.currentIndex > 1 && this.state.currentIndex < id ? (
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


                          {this.state.currentIndex === id ? (
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

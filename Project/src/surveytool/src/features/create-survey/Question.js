import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

export default class Question extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            key: 0,
            answer: '',
            answers: [],
            question: '',
            transmitted: false,
            success: false,
        }
    };

  static propTypes = {};

  removeAnswer = (key) => {
      if (this.state.transmitted) {
          //this.props.removeFilledQuestion(this.props.objId)
          alert('you already saved this question, if you want to change it you have to recreate the whole survey')
      } else {
          let result = this.state.data.filter( (data) => data.key !== key);
          this.setState({
              data: result,
              success: false
          });
      }
  };

  addAnswer = () => {
      if (this.state.answer !== '') {
          this.addAnswerValue();
      }

    let new_added_answer = {
        key: this.state.key,
    };

      this.setState({
          data: [...this.state.data, new_added_answer],
          key: this.state.key + 1,
      });
  };

  addAnswerValue = () => {
      this.setState({
          answers: [...this.state.answers, this.state.answer]
      });
  };

  onTextboxChangeAnswer = (event) => {
      this.setState({
          answer: event.target.value,
          transmitted: false
      });
  };

  onTextboxChangeQuestion = (event) => {
      this.setState({
          question: event.target.value,
          transmitted: false
      });
  };

  catchingLastAnswer = () => {
      if (this.state.answer !== '') {
          this.addAnswerValue();
      }
  };

  prepareQuestionObject = () => {
      if (this.state.question === '') {
          return false;
      }

      let result = {
          id: this.props.objId,
          question: this.state.question,
          type: this.props.type,
          answers: this.state.answers
      };
      return result;
  };

  saveQuestion = (question) => {
      console.log(question);
      this.props.setData(question);
      this.setState({transmitted:true})
  };

  onSetData = () => {
      if (this.state.transmitted) {
          alert('You already set this question, if you want to change it, you have to recreate the whole survey');
          return;
      }

      //this.catchingLastAnswer();

      let question = this.prepareQuestionObject();
      if (question) {
          this.saveQuestion(question);
          this.setState({transmitted:true});
      } else {
          alert('You have to input a question at least!')
      }
  };

  render() {
    let removeQuestion = this.props.removeQuestion;
    let addedAnswersGoHere = this.state.data.map( (data, index) => {
        return (
          <div key={data.key}>
            <TextField style={{marginTop: '2%'}} placeholder="Answer" onChange={this.onTextboxChangeAnswer} />
            <Button variant="contained" color="primary" onClick={() => this.removeAnswer(data.key)} style={{marginLeft: '2%'}}>Delete</Button>
          </div>
        )
    });
    return (
        <div>
            {this.props.type}
            <TextField
                style={{marginTop: '2%'}}
                placeholder="Question"
                fullWidth="true"
                multiline={true}
                onChange={this.onTextboxChangeQuestion}
            />
            <br></br>
            {addedAnswersGoHere}
            {this.props.type === "Text" ? (
            <div style={{marginTop: '2%', marginLeft: '65%'}}>
                <Button disabled="true" variant="contained" color="primary" style={{ marginRight: '2%'}}>Add new Answer</Button>
                <Button variant="contained" color="primary" onClick={() => removeQuestion(this.props.questionKey)}>Delete Question</Button>
                <Button variant="contained" color="primary" onClick={() => this.onSetData()}>Finish</Button>
                {this.state.transmitted ? (
                    <TextField
                        style={{marginTop: '2%'}}
                        placeholder="Question was set!"
                        fullWidth="false"
                        disabled="true"
                    />
                ) : (
                    <TextField
                        style={{marginTop: '2%'}}
                        placeholder="To finish, click add once again and finish!"
                        fullWidth="false"
                        disabled="true"
                    />
                )}
            </div>
            ) : (
            <div style={{marginTop: '2%', marginLeft: '65%'}}>
                <Button variant="contained" color="primary" onClick={this.addAnswer} style={{ marginRight: '2%'}}>Add new Answer</Button>
                <Button variant="contained" color="primary" onClick={() => removeQuestion(this.props.questionKey)}>Delete Question</Button>
                <Button variant="contained" color="primary" onClick={() => this.onSetData()}>Finish</Button>
                {this.state.transmitted ? (
                    <TextField
                        style={{marginTop: '2%'}}
                        placeholder="Question was set!"
                        fullWidth="false"
                        disabled="true"
                    />
                ) : (
                    <TextField
                        style={{marginTop: '2%'}}
                        placeholder="To finish, click add once again and finish!"
                        fullWidth="false"
                        disabled="true"
                    />
                )}
            </div>
            )}
            <Divider style={{marginTop: '2%'}}/>
        </div>
    );
  }
}
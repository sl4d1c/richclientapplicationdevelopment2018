import React, { Component } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


let state = {
    value: ''
};

export default class Text extends Component {

  constructor(props) {
    super(props);

    if(state.value === ''){
      state = this.state;
    }

    // Retrieve the last state
    this.state = state;
  }

  componentWillUnmount() {
    // Remember state for the next mount
    state = this.state;
  }

  state = {
    text: "",
  };

  changeText = (event) => {
    this.setState({ text: event.target.value });
  };

  onSetData = () => {
    let question = this.props.question;
    let answers = [this.state.text];

    this.props.setData(question, answers);
  };

  render() {
    return (
      <div className="survey-text">
        {this.props.question}<br />
        <TextField fullWidth="true" value={this.state.text} onChange={this.changeText}/>
          <Button variant="contained" color="primary" onClick={() => this.onSetData()}>Set Answer</Button>
      </div>
    );
  }
}

import React, { Component } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';

let state = {
    value: 0
};

export default class MultipleChoice extends Component {

  constructor(props) {
    super(props);

    if(state.value === 0){
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
    value: this.props.answers[0],
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  onSetData = () => {
    let question = this.props.question;
    let answers = [this.state.value];

    this.props.setData(question, answers);
  };

  render() {
    return (
      <div>
        <FormControl component="fieldset" required error>
          <FormLabel component="legend">{this.props.question}</FormLabel>
          <RadioGroup
            value={this.state.value}
            onChange={this.handleChange}
          >
          {this.props.answers.map((option, index) => (
            <FormControlLabel
              value={this.props.answers[index]}
              control={
                <Radio color="primary" />
              }
              label={this.props.answers[index]}
            />
          ))}
          </RadioGroup>
            <Button variant="contained" color="primary" onClick={() => this.onSetData()}>Set Answer</Button>
        </FormControl>
      </div>
    );
  }
}

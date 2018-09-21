import React, { Component } from 'react';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';


import update from 'react-addons-update';

let state = {
    actives: 0
};

export default class Checkboxes extends Component {

  constructor(props) {
    super(props);

    if(state.actives === 0){
      state = this.state;
    }

    // Retrieve the last state
    this.state = state;
  }

  componentWillUnmount() {
    // Remember state for the next mount
    state = this.state;
  }


  componentDidMount() {
    if(state.actives === 0){
      this.initActives();
    }
  }

  state = {
    actives: [],
  };

  initActives = () => {
    let buffer = [];
    for (let i = 0; i < this.props.answers.length; i++) {
      buffer.push(false)
    }

    this.setState({
      actives: buffer,
    });
  }

  handleChange = index => event => {
    this.setState({ 
      actives: update(this.state.actives, {[index]: {$set: event.target.checked }})
    });
  };

  onSetData = () => {
    let answers = [];
    for (let i = 0; i < this.state.actives.length; i++) {
        if (this.state.actives[i] === true) {
            answers.push(this.props.answers[i]);
        }
    };

    let question = this.props.question;

    this.props.setData(question, answers);
  };

  render() {
    return (
      <div className="survey-checkboxes">
        
        <FormControl component="fieldset">
          <FormLabel component="legend">{this.props.question}</FormLabel>
          <FormGroup>
          {this.props.answers.map((option, index) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={this.state.actives[index]}
                  onChange={this.handleChange(index)}
                  value={this.props.answers[index]}
                />
              }
              label={this.props.answers[index]}
            />
          ))}
          </FormGroup>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => this.onSetData()}>Set Answer</Button>
      </div>
    );
  }
}

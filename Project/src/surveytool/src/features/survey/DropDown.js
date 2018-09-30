import React, { Component } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import TextField from "@material-ui/core/TextField/TextField";

let state = {
    selectedIndex: 0
};

export default class DropDown extends Component {
  constructor(props) {
    super(props);

    if(state.selectedIndex === 0){
      state = this.state;
    }

    // Retrieve the last state
    this.state = state;
  }

  componentWillUnmount() {
    // Remember state for the next mount
    state = this.state;
  }

  button = null;

  state = {
    anchorEl: null,
    selectedIndex: 0,
      set:false
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  onSetData = () => {
      let question = this.props.question;
      let possibleAnswers = this.props.answers;
      let answers = [this.props.answers[this.state.selectedIndex]];

      this.props.setData(question, possibleAnswers, answers);
      this.setState({set: true});
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div className="survey-drop-down">
       <List component="nav">
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.props.question}
              secondary={this.props.answers[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="lock-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {this.props.answers.map((option, index) => (
            <MenuItem
              key={option}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleMenuItemClick(event, index)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
          <Button variant="contained" color="primary" onClick={() => this.onSetData()}>Set Answer</Button>
          {this.state.set ? (
              <TextField
                  style={{marginTop: '2%'}}
                  placeholder="Your answer was set"
                  fullWidth="false"
                  disabled="true"
              />
          ) : (
              <TextField
                  style={{marginTop: '2%'}}
                  placeholder="Choose one of the answers"
                  fullWidth="false"
                  disabled="true"
              />
          )}
      </div>
    );
  }
}

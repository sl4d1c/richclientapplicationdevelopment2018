import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import{ Header } from './index';
import Button from '@material-ui/core/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import {setInStorage} from "../../utils/storage";

export class ResetPassword extends Component {
    constructor () {
        super();

        this.state = {
            email: '',
            username: ''
        }
    }

  static propTypes = {
    resetPassword: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

    handleChangeMail = (event) => {
        const email = event.target.value;
        this.setState({ email: email });
    };

    handleChangeUsername = (event) => {
        const username = event.target.value;
        this.setState({ username: username });
    };
 
    handleSubmit = () => {
      if (this.state.username === '') {
        alert('you have to enter your username');
        return;
      }
      if (this.state.email === '') {
          alert('you have to enter your email');
          return;
      }

      fetch('/api/account/resetPassword', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email
            })
      })
          .then(res => res.json())
          .then(json => {
              console.log('json', json);
              if (json.success) {
                  alert('Email was sent!');
              } else {
                  alert('something went wrong');
                  this.setState({
                      signInError: json.message,
                  });
                }
            });
    };

  render() {
    return (
      <div className="root" style={{height: '100%', width: '100%', backgroundColor: '#3366ff', position: 'fixed'}}>
        <Header />
        <div style={{height: '94%', width: '60%', backgroundColor: '#ffffff', position: 'fixed', marginLeft: '20%'}}>
          <h1 style={{paddingLeft: '38%'}}>Send reset mail</h1>
          <ValidatorForm 
            style={{paddingTop: '30px', paddingLeft: '35%'}}
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <div className="username">
              <label style={{paddingRight: '100px', align: 'bottom', display: ''}}>Username:</label>
              <TextValidator
                margin="normal"
                onChange={this.handleChangeUsername}
                name="name"
                value={this.state.username}
                validators={['required']}
                errorMessages={['this field is required']}
            />
            </div>
            <div>
              <label style={{paddingRight: '100px'}}>E-Mail:</label>
              <TextValidator
                style={{paddingLeft: '28px'}}
                onChange={this.handleChangeMail}
                name="email"
                value={this.state.email}
                validators={['required', 'isEmail']}
                errorMessages={['this field is required', 'email is not valid']}
              />
              </div>
            <div style={{paddingLeft: '90px', paddingTop: '30px'}}>
              <Button variant='contained' color="primary" type='submit'>Send Mail</Button>
            </div>
          </ValidatorForm>
          </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    resetPassword: state.resetPassword,
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
)(ResetPassword);

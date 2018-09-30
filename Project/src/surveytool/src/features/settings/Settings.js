import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

import { Header } from './index';

import {
    getFromStorage,
} from '../../utils/storage';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export class Settings extends Component {
  static propTypes = {
    settings: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  state = {
      username:'',
      email:'',
      password:'',
      passwordRepeat:'',
      token:'',
      userId:'',
  };

  componentDidMount() {
      this.setToken();
      this.getUser();
  };

  getUser = () => {
      const obj = getFromStorage('the_main_app');
      if (obj && obj.userId) {
          const {userId} = obj;
          this.setState({userId: userId});
          fetch('/api/getUser?userId=' + userId)
              .then(res => res.json())
              .then(json => {
                  if (json.success) {
                      this.setState({
                          username: json.username,
                          email: json.email
                      });
                  } else {
                      //this.setState({});
                  }
              });
      } else {
          let url = window.location.href;
          let urlArray = url.split('=');
          let userId = urlArray[1];

          this.setState({userId: userId});
          fetch('/api/getUser?userId=' + userId)
              .then(res => res.json())
              .then(json => {
                  if (json.success) {
                      this.setState({
                          username: json.username,
                          email: json.email
                      });
                  }
              });
      }
  };

  setToken = () => {
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
          const { token } = obj;
          // Verify token
          fetch('/api/account/verify?token=' + token)
              .then(res => res.json())
              .then(json => {
                  if (json.success) {
                      this.setState({
                          token,
                      });
                  } else {
                      this.setState({});
                  }
              });
      } else {
          this.setState({
              isLoading: false,
          });
      }
  };

    onTextBoxPasswordRepeatChange = (event) => {
        this.setState({
            passwordRepeat: event.target.value
        });
    };

    update = () => {
        if (this.state.password === this.state.passwordRepeat) {
            const data = {
                userId: this.state.userId,
                password: this.state.password
            };
            console.log('before fetch ',data);
            fetch('/api/account/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: data,
                }),
            })
                //.then(res => res.status()  json())
                .then(res => {
                    if (res.ok) {
                        alert('New password was successfully set!');
                    }});
                console.log('after fetch');
        } else {
            alert('Passwords do not match!')
        }
    };

  render() {
    return (
      <div style={{ height: '100%', width: '100%', backgroundColor: '#3366ff', position: 'fixed' }}>
        <Header />
        <div style={{ height: '100%', width: '60%', backgroundColor: '#ffffff', position: 'fixed', marginLeft: '20%', }}>
          <h1 style={{ marginLeft: '43%' }}>Settings</h1>
          <div style={{ marginLeft: '28%', marginTop: '5%' }}>
            <div style={{ marginTop: '3%' }}>
              <label style={{ marginRight: '100px', paddingLeft: '88px' }}>Username:</label>
              <TextField disabled="true" value={this.state.username}/>
            </div>
            <div style={{ marginTop: '3%' }}>
              <label style={{ marginRight: '100px', paddingLeft: '116px' }}>E-Mail:</label>
              <TextField disabled="true" value={this.state.email}/>
            </div>
            <div style={{ marginTop: '3%' }}>
              <label style={{ marginRight: '100px', paddingLeft: '55px' }}>New Password:</label>
              <TextField type="password" onChange={this.onTextBoxPasswordChange} />
            </div>
            <div style={{ marginTop: '3%' }}>
              <label style={{ marginRight: '100px' }}>Repeat New Password:</label>
              <TextField type="password" onChange={this.onTextBoxPasswordRepeatChange}/>
            </div>
            <Button variant="contained" onClick={this.update} color="primary" style={{ marginLeft: '23%', marginTop: '5%'}}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    settings: state.settings,
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
)(Settings);

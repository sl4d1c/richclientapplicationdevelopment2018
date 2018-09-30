import React from 'react';
import PropTypes from 'prop-types';

import {
    getFromStorage,
    setInStorage,
    clearStorage
} from '../../utils/storage';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            openLogin: false,
            openRegister: false,
            openDebug: false,
            login: false,
            signUpUsername: '',
            signUpPassword: '',
            signUpPasswordVerify: '',
            signUpEmail: '',
            signInUsername:'',
            signInPassword:'',
            token: '',
            signUpError: '',
            signInError: ''
        };
    }



  componentDidMount() {
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
                          login: true
                      });
                  } else {
                      this.setState({
                      });
                  }
              });
      } else {
          this.setState({
              isLoading: false,
          });
      }
  };

  onSignIn = () => {
      const {
          signInUsername,
          signInPassword,
      } = this.state;

      fetch('/api/account/signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              username: signInUsername,
              password: signInPassword
          })
      }).then(res => res.json())
          .then(json => {
              console.log('json', json);
              if (json.success) {
                  setInStorage('the_main_app', { token: json.token, userId: json.userId });
                  this.setState({
                      signInError: json.message,
                      token: json.token,
                      login: true
                  });
                  this.handleCloseLogin();
              } else {
                  this.setState({
                      signInError: json.message,
                  });
              }
          });
  };

  handleClickOpenLogin = () => {
    this.setState({ openLogin: true });
  };

  handleCloseLogin = () => {
    this.setState({ openLogin: false });
  };

  handleClickOpenRegister = () => {
    this.setState({ openRegister: true });
  };

  handleCloseRegister = () => {
    this.setState({ openRegister: false });
  };

  switchfromRegister = () => {
    this.handleCloseRegister();
    this.handleClickOpenLogin();
  };

  switchfromLogin = () => {
    this.handleCloseLogin();
    this.handleClickOpenRegister();
  };

  onTextboxChangeSignInUsername = (event) => {
      this.setState({
          signInUsername: event.target.value
      });
  };

  onTextboxChangeSignInPassword = (event) => {
      this.setState({
          signInPassword: event.target.value
      });
  };

  onTextboxChangeSignUpEmail = (event) => {
    this.setState({
      signUpEmail: event.target.value,
    });
  };

  onTextboxChangeSignUpUsername = (event) => {
    this.setState({
      signUpUsername: event.target.value,
    });
  };

  onTextboxChangeSignUpPassword = (event) => {
    this.setState({
      signUpPassword: event.target.value,
    });
  };

  onTextboxChangeSignUpPasswordVerify = (event) => {
    this.setState({
      signUpPasswordVerify: event.target.value,
    });
  };
  
  onSignUp() {
    // Grab state
    if (this.state.signUpPassword === this.state.signUpPasswordVerify) {
      const {
        signUpEmail,
        signUpPassword ,
        signUpUsername,
      } = this.state;

      // Post request to backend
      fetch('/api/account/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: signUpEmail,
          username: signUpUsername,
          password: signUpPassword,
        }),
      }).then(res => res.json())
      .then(json => {
        console.log('json', json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            signUpEmail: '',
            signUpPassword: '',
          });
          alert('Thanks! You registered successfully, now you can login');
          this.handleCloseRegister();
        } else {
          this.setState({
            signUpError: json.message,
          });
          alert('Oops, something went wrong, please try again!');
        }
      });
    }
  }

  logout() {
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const {token} = obj;
          // Verify token
          fetch('/api/account/logout?token=' + token)
            .then(res => res.json())
            .then(json => {
              if (json.success) {
                console.log('json', json);
                this.setState({
                    token: '',
                    login: false
                });
                clearStorage('the_main_app');
              }
            });
      }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{ backgroundColor: '#3366ff' }}>
          <Toolbar>
            <Button variant="title" color="inherit" size="large" href="/">
              Surveytool
            </Button>
            <Typography style={{ flex: '1' }} />
            {!this.state.login ? (
              <div>
                <Button color="inherit" onClick={this.handleClickOpenLogin}>
                  Login
                </Button>
                <Button color="inherit" onClick={this.handleClickOpenRegister}>
                  Register
                </Button>

                <Dialog
                  open={this.state.openLogin}
                  onClose={this.handleCloseLogin}
                  aria-labelledby="login-dialog"
                >
                  <DialogTitle id="login-dialog">Login</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Enter username and password to login.</DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="username"
                      label="Username"
                      type="text"
                      fullWidth
                      onChange={this.onTextboxChangeSignInUsername}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      onChange={this.onTextboxChangeSignInPassword}
                    />
                    <div style={{ paddingTop: '10px' }}>
                      <input name="stay" type="checkbox" checked={this.state.isGoing} />
                      Stay logged in
                    </div>
                    <br />
                    <a href="#" onClick={this.switchfromLogin}>
                      Not registered? Register now!
                    </a>
                    <br />
                    <a href="reset-password">Can't remember password? Click here!</a>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      variant="contained"
                      onClick={this.onSignIn}
                      color="primary"
                    >
                      Login
                    </Button>
                    <Button variant="contained" onClick={this.handleCloseLogin} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>

                <Dialog
                  open={this.state.openRegister}
                  onClose={this.handleCloseRegister}
                  aria-labelledby="register-dialog"
                >
                  <DialogTitle id="register-dialog">Register</DialogTitle>
                  <DialogContent>
                    <DialogContentText>Fill out the form to register.</DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="username"
                      label="Username"
                      type="text"
                      fullWidth
                      onChange={this.onTextboxChangeSignUpUsername}
                      //onChange={this.getUsername}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="mail"
                      label="E-Mail"
                      type="email"
                      fullWidth
                      onChange={this.onTextboxChangeSignUpEmail}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="password"
                      label="Password"
                      type="password"
                      fullWidth
                      onChange={this.onTextboxChangeSignUpPassword}
                    />
                    <TextField
                      required
                      margin="dense"
                      id="rep-password"
                      label="Repeat Password"
                      type="password"
                      fullWidth
                      onChange={this.onTextboxChangeSignUpPasswordVerify}
                    />
                    <div style={{ paddingTop: '10px' }}>
                      <input name="stay" type="checkbox" checked={this.state.isGoing} />
                      Stay logged in
                    </div>
                    <br />
                    <a href="#" onClick={this.switchfromRegister}>
                      Already registered? Click here!
                    </a>
                    <br />
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" onClick={this.onSignUp.bind(this)} color="primary">
                      Register
                    </Button>
                    <Button variant="contained" onClick={this.handleCloseRegister} color="primary">
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            ) : (
              <div>
                <Button color="inherit" href="create-survey">
                  Create Survey
                </Button>
                <Button color="inherit" href="my-surveys">My Surveys</Button>
                <Button color="inherit" href="settings">Settings</Button>
                <Button color="inherit" onClick={this.logout} href="home">
                  Logout
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);

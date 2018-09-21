import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Header } from './index';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
    getFromStorage,
} from '../../utils/storage';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 300,
  },
});

let id = 0;

function createData(name, duration, answerLink, results) {
  id += 1;
  return { id, name, duration, answerLink, results};
}

function calculateCurrentDuration(){
  let now = new Date();
  return now.getDate() + '.' + (now.getMonth() + 1) + '.' + now.getFullYear();
}

function giveResultLink(){
  return "return link from server";
}

function giveAnswerLink() {
  return "return link from server";
}

const data_bak = [
  createData('Survey on Frozen yoghurt', calculateCurrentDuration(), giveAnswerLink(), giveResultLink()),
  createData('Survey on Ice cream sandwich', calculateCurrentDuration(), giveAnswerLink(), giveResultLink()),
  createData('Survey on Cupcakes', calculateCurrentDuration(), giveAnswerLink(), giveResultLink()),
  createData('Survey on Gingerbread', calculateCurrentDuration(), giveAnswerLink(), giveResultLink()),
];

export class MySurveys extends Component {
    constructor() {
        super();
        this.state = {
            token:'',
            userId:'',
            data: [],
            isLoading:true
        };
    }

    static propTypes = {
        mySurveys: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired,
    };

  /*state = {
    token:'',
      userId:'',
      data: []
  };*/

  /*
  componentDidMount() {
    this.checkToken();
    this.loadData();

    console.log('data ', this.state.data);
    console.log('static ', data_bak)
  };*/

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
                          userId: json.userId
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

      if (obj && obj.userId) {
          const {userId} = obj;
          console.log(userId);
          fetch('/api/survey/getUserSurveys?userId=' + userId)
              .then(res => res.json())
              .then(json => {
                  if (json.success) {
                      this.setState({
                          data: json.data,
                          isLoading: false
                      });
                  }
              });
      }
  };

  loadData = () => {
      let data = [];
      const obj = getFromStorage('the_main_app');
      if (obj && obj.userId) {
          const { userId } = obj;
          console.log(userId);
          fetch('/api/survey/getUserSurveys?userId=' + userId)
              .then(res =>  res.json())
              .then(json => {
                  if (json.success) {
                      /*this.setState({
                          data: json.data
                      });*/
                      data = json.data
                  }
              });
      }

      console.log(data);
      this.setData(data);
  };

  setData = (data) => {
    this.setState({
        data: data,
        isLoading: false
    })
  };

  checkToken = () => {
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
                          userId: json.userId
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


  render() {
      if (this.state.isLoading) {
          return ('isLoading ...');
      } else {
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
                      <h1 style={{ marginLeft: '43%' }}>Surveys</h1>
                      <Paper styles={styles.root}>
                          <Table styles={styles.table}>
                              <TableHead>
                                  <TableRow>
                                      <TableCell>Name</TableCell>
                                      <TableCell>Duration</TableCell>
                                      <TableCell>Answer link</TableCell>
                                      <TableCell>Results</TableCell>
                                  </TableRow>
                              </TableHead>
                              <TableBody>
                                  {this.state.data.map(n => {
                                      return (
                                          <TableRow key={n.id}>
                                              <TableCell component="th" scope="row">
                                                  {n.name}
                                              </TableCell>
                                              <TableCell>{n.duration}</TableCell>
                                              <TableCell>{n.answerLink}</TableCell>
                                              <TableCell>{n.results}</TableCell>
                                          </TableRow>
                                      );
                                  })}
                              </TableBody>
                          </Table>
                      </Paper>
                  </div>
              </div>
          );
      }
      }

}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    mySurveys: state.mySurveys,
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
)(MySurveys);

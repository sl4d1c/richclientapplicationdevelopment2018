import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import{ Header, Question } from './index';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import {getFromStorage} from "../../utils/storage";

export class CreateSurvey extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            key: 0,
            objId: 1,
            surveySaveError: '',
            surveySaved: false,
            title:'',
            titleDialog: true,
            question:'',
            answer:'',
            submitData: [],
            token: '',
            userId: ''
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
    }

  static propTypes = {
  };

  submitSurvey = () => {
      const {
          userId,
          submitData,
          title
      } = this.state;

      console.log(userId, title, submitData);
      // Post request to backend
      fetch('/api/survey/save', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userId: userId,
              title: title,
              data: submitData,
          })
      }).then(res => res.json())
          .then(json => {
              console.log('json', json);
              if (json.success) {
                  this.setState({
                      surveySaveError: json.message,
                      surveySaved: true
                  });
                  alert('survey was create, you can find it in "my-survey"')
              } else {
                  this.setState({
                      surveySaveError: json.message,
                  });
              }
          });
  };

  removeQuestion = (key) => {
    let result = this.state.data.filter( (data) => data.key !== key);
    this.setState({
      data: result,
    });

    this.removeFilledQuestion(key);
  };

  addDropDownQuestion = () => {
    let new_added_dropdown = {
        type: 'Drop Down',
        key: this.state.key
    };
    this.addToData(new_added_dropdown);    
  };

  addMultipleChoiceQuestion = () => {
    let new_added_multiple_choice = {
        type: 'Multiple Choice',
        key: this.state.key
    };
    this.addToData(new_added_multiple_choice);    
  };

  addCheckboxQuestion = () => {
    let new_added_checkbox = {
        type: 'Checkbox',
        key: this.state.key
    };
    this.addToData(new_added_checkbox);    
  };


  addTextQuestion = () => {
    let new_added_text = {
        type: 'Text',
        key: this.state.key
    };
    this.addToData(new_added_text); 
  };

  addToData = (newlyAdded) => {
    this.setState({ 
      data: [...this.state.data, newlyAdded],
      key: this.state.key + 1,
    });
  };

  onTextboxChangeTitle = (event) => {
    this.setState({title: event.target.value});
  };

  onAddAnswerData = (answerData) => {
      console.log('answerDataParent => ', answerData);
      this.setState({
          submitData: [...this.state.submitData, answerData],
          objId: this.state.objId + 1
      });

      console.log('submitData => ',this.state.submitData)
  };

  removeFilledQuestion = (key) => {
      let result = this.state.submitData.filter( (data) => data.id !== key);
      this.setState({
          submitData: result,
      });
    };

  render() {
    let addedQuestionsGoHere = this.state.data.map( (data) => {
        return (
          <Question
              questionKey={data.key}
              objId={this.state.objId}
              type={data.type}
              removeQuestion={this.removeQuestion}
              setData={this.onAddAnswerData}
              removeFilledQuestion={this.removeFilledQuestion}
          />
        )
    });

    return (
      <div className="root" style={{height: '100%', width: '100%', backgroundColor: '#3366ff', position: 'fixed'}}>
        <Header />
        <div style={{height: '100%', width: '60%', backgroundColor: '#ffffff', position: 'fixed', marginLeft: '20%'}}>
          <AppBar position="static" style={{ backgroundColor: '#919191' }}>
            <Toolbar>
            <Button color="inherit" onClick={this.addDropDownQuestion}>
                  Drop Down
            </Button>
            <Button color="inherit" onClick={this.addTextQuestion}>
                  Text
            </Button>
            <Button color="inherit" onClick={this.addMultipleChoiceQuestion}>
              Multiple Choice
            </Button>
            <Button color="inherit" onClick={this.addCheckboxQuestion}>
                  Checkbox
            </Button>
            <Typography style={{ flex: '1' }} />
            <Button color="inherit" href='home' onClick={this.submitSurvey}>
                  Submit
            </Button>
            </Toolbar>
          </AppBar>
          <div style={{height: '86%', width: '60%', position: 'fixed', overflow: 'auto'}}>
              <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="title"
                  label="Title"
                  type="text"
                  fullWidth
                  onChange={this.onTextboxChangeTitle}
              />
              {addedQuestionsGoHere}
          </div>
            <div style={{display:'none'}}>
                <Question/>
            </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    createSurvey: state.createSurvey,
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
)(CreateSurvey);

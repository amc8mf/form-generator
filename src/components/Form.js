import React, { Component } from 'react';
import TypeInput from './TypeInput';
import LabelInput from './LabelInput';
import OptionsInput from './OptionsInput';
import GenerateQuestionButton from './GenerateQuestionButton';
import QuestionGenerator from './QuestionGenerator';
import AllQuestions from './AllQuestions';

class Form extends React.Component {
  // outer form for handling all sub components on page.
  constructor(props) {
    super(props);
    // data needed for building the question the user is trying to create.
    this.state = {
      type : '',
      label : '',
      optionToAdd : '',
      options : [],
      questions : []
    }
    // if any input component changes, update state at the highest level.
    this.handleStateChange= this.handleStateChange.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.logFields= this.logFields.bind(this);

  }

  logFields = () => {
    const {type, label, options, questions} = this.state;
    // console.log(`${type}`, `${label}`, `${options}`, `${questions}`);
  }

  handleStateChange(item) {
    if (typeof item === 'function') {
      this.setState(function(prevState, prevProps) {
        return item(prevState, prevProps);
      });
    } else {
      this.setState(item);
    }
    this.logFields();
  }

  handleClickAdd () {
    // invoked when user is finishing building question and wants to add it to finished questions.
    // clear out state so user can start new question.
    this.handleStateChange((prevState, prevProps) => {
      let newQuestion = {type : this.state.type, label : this.state.label, options : this.state.options};
      return {
        questions : prevState.questions.concat(newQuestion),
        type : '',
        label : '',
        optionToAdd : '',
        options : []
      };
    });
  }

  render() {
    return (
      <div class="container">
        <div class="jumbotron"><h1 class="text-center">Questionnaire Generator</h1></div>
        <div><h4>Question Details:</h4></div>
        <form class="form-horizontal border-bottom" role="form">
          <TypeInput type = {this.state.type} handleStateChange = {this.handleStateChange} value = ''/>
        	<LabelInput label = {this.state.label} handleStateChange = {this.handleStateChange} value = ''/>
        	<OptionsInput handleStateChange = {this.handleStateChange} optionToAdd = {this.state.optionToAdd} value=''/>
        </form>
        <div class="pt-4"><h4>Current Question:</h4></div>
        <form class="form-horizontal border-bottom" role="form">
          <QuestionGenerator handleStateChange = {this.handleStateChange} type= {this.state.type} label = {this.state.label}  optionToAdd = {this.state.optionToAdd} options = {this.state.options}/> 
          <GenerateQuestionButton parentMethodOnAdd={this.handleClickAdd}/>
        </form>
        <div class="pt-4"><h4>Generated Questions:</h4></div>
        <AllQuestions questions = {this.state.questions}/>
      </div>
    );
  }
}

export default Form;

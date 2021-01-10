import React, { Component } from 'react';
import QuestionGenerator from './QuestionGenerator';

class AllQuestions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: props.questions
    };
    this.createInputs = this.createInputs.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.questions != prevProps.questions){
      this.setState({
          questions: this.props.questions
      });
    }
  }

  createInputs() {
    const newArray =  this.state.questions.map((question) => {
      return(
          <QuestionGenerator type= {question.type} label = {question.label} options = {question.options}/>
      );
    });
    return newArray;
  }
  render() {
    return (
      <div>
        {this.createInputs()}
      </div>
    )
  }
}

export default AllQuestions;

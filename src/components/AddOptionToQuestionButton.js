import React, { Component } from 'react';

class AddOptionToQuestionButton extends React.Component {
  // handles options for radios and selects.
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.parentMethod();
    event.preventDefault();
  }

  render () {
    return (
      <span class='inline-btn'>
        <button class="btn btn-success" onClick={this.handleClick}>Add Option</button>
      </span>
    );   
  }
}

export default AddOptionToQuestionButton;

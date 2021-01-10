import React, { Component } from 'react';

class QuestionGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      label : props.label,
      options: props.options
    };
    this.createSelectOptions = this.createSelectOptions.bind(this);
    this.createRadioOptions = this.createRadioOptions.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.type != prevProps.type){
      this.setState({
          type: this.props.type
      });
    }
    if(this.props.label != prevProps.label){
      this.setState({
          label: this.props.label
      });
    }
    if(this.props.options != prevProps.options){
      this.setState({
          options: this.props.options
      });
    }
  }

  createSelectOptions () {
    let optsArray = [<option value=""></option>];
    this.state.options.forEach(function(opt) {
      optsArray.push(<option value={opt}>{opt}</option>)
    });
    return optsArray;
  }

  createRadioOptions () {
    let optsArray = [];
    const radioName = "radio" + (Math.floor(Math.random() * 10000) + 1);
    this.state.options.forEach(function(opt) {
      optsArray.push(<div class="radio-option"><label><input type="radio" name={radioName} value={opt}></input>{opt}</label><br /></div>)
    });
    return optsArray;
  }


  render () {
    if (this.state.type == 'select') {
      return (
        <div class="form-group">
          <label class="control-label text-right col-md-3">
            {this.state.label}
          </label>
          <div class="col-md-6 d-inline-block">
            <select class="form-control">
                {this.createSelectOptions()}
            </select>
          </div>
        </div>
      )
    } else if (this.state.type == 'textarea') {
      return (
        <div class="form-group">
          <label class="control-label text-right col-md-3 text-area-label">
            {this.state.label}
          </label>
          <div class="col-md-6 d-inline-block">
            <textarea class="form-control" type={this.state.type} rows="5" cols="50"></textarea>
          </div>
        </div>
      )
    } else if (this.state.type == 'radio') {
      return (
        <div class="form-group">
          <label class="control-label col-md-3 text-right radio-label">
            {this.state.label}
          </label>
          <div class="col-md-6, d-inline-block">
            {this.createRadioOptions()}
          </div>
        </div>
      )
    }
     else if (this.state.type == 'text') {
      return (
        <div class="form-group">
          <label class="control-label col-md-3 text-right">
            {this.state.label}
          </label>
          <div class="col-md-6 d-inline-block">
            <input class="form-control" type={this.state.type}/>
          </div>
        </div>
      );   
    } else if (this.state.type == 'date') {
      return (
        <div class="form-group">
          <label class="control-label col-md-3 text-right">
            {this.state.label}
          </label>
          <div class="col-md-6 d-inline-block">
          </div>
        </div>
      );   
    } else {
      return (
        <div class="form-group">
          <p class="font-italic col-md-12 text-center">Fill out the questions above to see what it will look like.</p>
        </div>        
      );
    }
  }
}

export default QuestionGenerator;

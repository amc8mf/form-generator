import React, { Component } from 'react';

class GenerateQuestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label : props.label
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.label != prevProps.label){
      this.setState({
          label: this.props.label
      });
    }
  }

  handleChange(event) {
    this.props.handleStateChange({label : event.target.value});
  }

  render() {
    return (
        <div class="form-group">
          <label class="control-label col-md-3 text-right">Question Label:</label>
          <div class="col-md-6 d-inline-block">
            <input type="text" class="form-control" value={this.state.label} onChange={this.handleChange} />
          </div>
        </div>
    );
  }
}

export default GenerateQuestionButton;

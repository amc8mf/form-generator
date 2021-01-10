import React, { Component } from 'react';

class TypeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type : props.type
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.type != prevProps.type){
      this.setState({
          type: this.props.type
      });
    }
  }

  handleChange(event) {
    this.props.handleStateChange({type : event.target.value});
  }

  render() {
    return (
        <div class="form-group">
          <label class="col-md-3 control-label text-right">Type of Question:</label>
          <div class="col-md-6 d-inline-block">
            <select value={this.state.type} class="form-control" onChange={this.handleChange}>
              <option value=''></option>
              <option value='text'>text</option>
              <option value='textarea'>textarea</option>
              <option value='radio'>radio</option>
              <option value='select'>select</option>
              <option value='date'>date</option>
            </select>
          </div>
        </div>
    );
  }
}

export default TypeInput;

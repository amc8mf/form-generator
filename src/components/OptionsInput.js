import React, { Component } from 'react';
import AddOptionToQuestionButton from './AddOptionToQuestionButton';

class OptionsInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      optionToAdd : props.optionToAdd,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.optionToAdd != prevProps.optionToAdd){
      this.setState({
          optionToAdd: this.props.optionToAdd
      });
    }
  }

  handleChange(event) {
    this.props.handleStateChange({optionToAdd : event.target.value});
  }

  handleClickAdd() {
    this.props.handleStateChange((prevState, prevProps) => {
      const newArray = prevState.options.concat(prevState.optionToAdd);
      return {options: newArray, optionToAdd: ''};
    });
  }

  render() {
    return (
      <div class="form-group">
        <label class="control-label col-md-3 text-right">Options For Question:</label>
        <div class="col-md-6 d-inline-block">
          <input type="text" class="form-control col-md-9 d-inline-block" value={this.state.optionToAdd} onChange={this.handleChange}/>
          <AddOptionToQuestionButton class="col-md-2" parentMethod={this.handleClickAdd}/>
        </div>
      </div>
    );
  }
}

export default OptionsInput;

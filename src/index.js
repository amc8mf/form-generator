import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import $ from 'jquery';

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

class LabelInput extends React.Component {
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

class GenerateQuestionButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    this.props.parentMethodOnAdd();
    event.preventDefault();
  }

  render () {
    return (
      <div class="add-button col-md-9 text-right form-group">
        <button class="btn btn-success" onClick={this.handleClick}>Add Question</button>
      </div>
    );   
  }
}

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


ReactDOM.render(
  <Form />,
  document.getElementById('root')
);

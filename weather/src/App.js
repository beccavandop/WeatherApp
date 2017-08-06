import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <TodoForm />
        </div>
      </div>
      );
  }
}

class TodoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      city: '',
      currentTemp: '',
      precipIntense: 0,
      precipChance: 0,
      date: '',
      uvIndex: 0,
      icon: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      text: event.target.value //setting input to a state, so it can keep being updated
    });
  }


  handleSubmit(event) {
    event.preventDefault(); //prevents page from reloading
    const todoItem = this.state.text; //assigning my input text to a variable
    console.log('You typed: ' + this.state.text); //console.log to test
    axios.post('http://localhost:8080/', this.state)
      .then(res => {
        console.log(res.data)
        this.setState({
          city: this.state.text,
          currentTemp: res.data.currently.temperature,
          precipIntense: res.data.currently.precipIntensity,
          precipChance: res.data.currently.precipProbability,
          date: res.data.currently.time,
          uvIndex: res.data.currently.uvIndex,
          icon: res.data.currently.icon
        })
        console.log(this.state);
      })

  // this.setState(function () { //once the submition happens, clear the form
  //   return {
  //     text: ''
  //   }
  // });
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-group">
          <span className="input-group-btn">
            <button type="submit" value="Submit" className="btn btn-primary">Add
                                    </button>
          </span>
          <input type="text" onChange={this.handleChange} value={this.state.text} className="form-control" required />
        </div>
      </form>
      );
  }
}

export default App;

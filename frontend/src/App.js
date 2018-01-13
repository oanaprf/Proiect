import React, { Component } from 'react';
import './App.css';
import DataList from './lists/DataList';
import WebcamList from './lists/WebcamList';

class App extends Component {
  constructor(){
    super()
    this.handlerCategorii = this.handlerCategorii.bind(this);
    this.handlerTari = this.handlerTari.bind(this);
    this.state = {
      data: ""
    }
  }
  handlerCategorii() {
      this.setState({
        data: "categorii"
      });
  }
  handlerTari() {
      this.setState({
        data: "tari"
      });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="header">🏂LOCURI DE INTERES🏄</h1>
        </header>
        <div className="Data">
          <button className="btn btn-primary" onClick={this.handlerCategorii}>Categorii</button>
          <button className="btn btn-primary" onClick={this.handlerTari}>Tari</button>
          <DataList data={this.state.data}/>
        </div>
          <WebcamList/>
      </div>
    );
  }
}

export default App;

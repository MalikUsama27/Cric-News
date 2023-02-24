import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {

  pageSize = 9;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Routes>
            <Route exact path="/home" element={<News setProgress={this.setProgress} key={"home"} pageSize={this.pageSize} country="in" category="home" />}></Route>
            <Route exact path="/technology" element={<News setProgress={this.setProgress} key={"technology"} pageSize={this.pageSize} country="in" category="technology" />}></Route>
            <Route exact path="/business" element={<News setProgress={this.setProgress} key={"business"} pageSize={this.pageSize} country="us" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} key={"entertainment"} pageSize={this.pageSize} country="in" category="entertainment" />}></Route>
            <Route exact path="/genral" element={<News setProgress={this.setProgress} key={"genral"} pageSize={this.pageSize} country="ua" category="genral" />}></Route>
            <Route exact path="/health" element={<News setProgress={this.setProgress} key={"health"} pageSize={this.pageSize} country="pl" category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={this.setProgress} key={"science"} pageSize={this.pageSize} country="us" category="science" />}></Route>
            <Route exact path="/sport" element={<News setProgress={this.setProgress} key={"sport"} pageSize={this.pageSize} country="in" category="sport" />}></Route>
          </Routes>
        </Router>
      </div>
    )
  }
}

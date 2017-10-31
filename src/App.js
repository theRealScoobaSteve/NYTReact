import React, { Component } from 'react';
import './App.css';
import HEADER from "./components/header"
import SEARCH_FORM from "./components/search-form"

class App extends Component {

  render() {
    return (
		<div className="container">
			<HEADER />
			<SEARCH_FORM />
		</div>
    )
  }
}

export default App;

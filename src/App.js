import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import countries from './countries.json';

import {Route} from 'react-router-dom';

export default class App extends Component {
  state = {
    countries: []
  }

  componentDidMount() {
    this.setState({
      countries: countries
    })
  }
  
  render() {
    const {countries} = this.state;
    return (
      <div className="App">
        <NavBar />
        
        <div className='container-fluid'>
          <div className='row'>
            <CountriesList countries={countries} />
            <Route path='/countries/:id' component={CountryDetails} />
          </div>
        </div>
      </div>
    );
  }
}
import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
// import countries from './countries.json';
import axios from 'axios';

import {Route} from 'react-router-dom';

export default class App extends Component {
  state = {
    countries: []
  }

  async componentDidMount() {
    try {
      const response = await axios.get('https://restcountries.eu/rest/v2/all');
      this.setState({
        countries: response.data
      })
    } catch (error) {
      console.log(error);
    }
    // this.setState({
    //   countries: countries
    // })
  }
  
  render() {
    const {countries} = this.state;
    return countries.length
    ? (
      <div className="App">
        <NavBar />
        
        <div className='container-fluid'>
          <div className='row'>
            <CountriesList countries={countries} />
            <Route path='/countries/:id' component={CountryDetails} />
          </div>
        </div>
      </div>
    )
    : <h1 className='text-center mt-5'>Loading...</h1>
  }
}
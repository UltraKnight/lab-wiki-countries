import React from 'react';
// import countries from '../countries.json';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class CountryDetails extends React.Component {
    state = {
        countryName: '',
        capital: '',
        area: 0,
        borders: [],
        countryCode: '',
        loading: true,
    }

    updateCountry = async () => {
        try {
            this.setState({
                loading: true
            })

            const countryCode = this.props.match.params.id;
            const response = await axios.get('https://restcountries.eu/rest/v2/all');
            const countries = response.data;
            const foundCountry = countries.find(country => country.alpha3Code === countryCode);

            if(!foundCountry) {
                this.setState({
                    countryCode: countryCode,
                    loading: false
                })
                return;
            }

            const borders = foundCountry.borders.map(border => {
                return countries.find(country => country.alpha3Code === border);
            })

            this.setState({
                countryName: foundCountry.name,
                capital: foundCountry.capital,
                area: foundCountry.area,
                borders: borders,
                countryCode: foundCountry.alpha3Code,
                loading: false
            })
        } catch (error) {
            this.setState({
                error: true,
                loading: false
            })
            console.log(error);
        }
    }

    componentDidMount() {
        this.updateCountry();
    }

    componentDidUpdate() {
        const countryCodeFromProp = this.props.match.params.id;
        const {countryCode, loading} = this.state;
        if(countryCodeFromProp !== countryCode && ! loading) {
            this.updateCountry();
        }
    }

    render() {
        const {countryName, capital, area, borders, loading} = this.state;
        return !loading && countryName ? (
            <div className="col-7 d-inline-block">
                <h1>{countryName}</h1>
                <table className="table">
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td style={{width: '30%'}}>Capital</td>
                            <td>{capital}</td>
                        </tr>
                        <tr>
                            <td>Area</td>
                        <td>
                            {area} km
                            <sup>2</sup>
                        </td>
                        </tr>
                        <tr>
                            <td>Borders</td>
                            <td>
                                <ul>
                                    {
                                        borders.map((border, i)=> {
                                        return (
                                            <li key={i}>
                                                <Link
                                                    to={`/countries/${border.alpha3Code}`}
                                                >{border.name}</Link>
                                            </li>
                                        )
                                        })
                                    }
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
        : <div></div>
    }
}
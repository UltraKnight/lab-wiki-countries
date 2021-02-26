import React from 'react';
import countries from '../countries.json';
import {Link} from 'react-router-dom'

export default class CountryDetails extends React.Component {
    state = {
        countryName: '',
        capital: '',
        area: 0,
        borders: [],
        countryCode: ''
    }

    findCountry= () => {
        const countryCode = this.props.match.params.id;
        const foundCountry = countries.find(country => country.cca3 === countryCode)
        this.setState({
            countryName: foundCountry.name.common,
            capital: foundCountry.capital[0],
            area: foundCountry.area,
            borders: foundCountry.borders,
            countryCode: foundCountry.cca3
        })
    }

    componentDidMount() {
        this.findCountry();
    }

    componentDidUpdate() {
        const countryCodeFromProp = this.props.match.params.id;
        const {countryCode} = this.state;
        if(countryCodeFromProp !== countryCode) {
            this.findCountry();
        }
    }

    render() {
        const {countryName, capital, area, borders, countryCode} = this.state;
        return(
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
                                            <li>
                                                <Link key={i} 
                                                    to={`/countries/${border}`}>
                                                    {countries.find(country => country.cca3 === border).name.common}
                                                </Link>
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
    }
}
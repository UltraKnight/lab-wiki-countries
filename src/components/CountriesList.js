import React from 'react';
import {Link} from 'react-router-dom'

export default function CountriesList({countries}) {
    return(
        <div className="col-5 d-inline-block" style={{maxHeight: '90vh', overflow: 'scroll'}}>
            <div className="list-group">
                {
                    countries.map((country, i)=> 
                        <Link key={i} className='list-group-item list-group-item-action' to={`/countries/${country.alpha3Code}`}>
                            <img src={`https://www.countryflags.io/${country.alpha2Code.toLowerCase()}/flat/32.png`} 
                                alt={`Flag of ${country.name}`} className='mr-2' />
                            {country.name}
                        </Link>
                    )
                }
            </div>
        </div>
    )
}
import React, { useState, useEffect } from 'react'
import axios from "axios"

const App = () => {

    const [newCountry, setCountry] = useState([])
    const [newInputCountry, setInputCountry] = useState("")

    useEffect(() => {
        axios.get("https://restcountries.com/v2/all")
            .then(response => {
                setCountry(response.data)
            })
    }, [])

    const countryHandler = (event) => {
        setInputCountry(event.target.value)
    }

    return (
        <div>
            find countries <input onChange={countryHandler} value={newInputCountry} />
            <FilterCountries data={newCountry} filter={newInputCountry} setFilter={setInputCountry}/>
        </div>
    )
}

const FilterCountries = ({ data, filter, setFilter}) => {

    let countries = data.filter(country => country.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

    if (countries.length > 10) {
        return (
            <p>Too many matches, specify another filter</p>
        )
    }
    else if (countries.length > 1 && countries.length <= 10) {
        return (
            <div>
                {countries.map((country) =>
                    <div key={country.name}>
                        <p style={{display:"inline-block"}}>{country.name}</p>
                        <CountryButton country={country} setFilter={setFilter}/>
                    </div>
                )}
            </div>
        )
    }
    else if (countries.length === 1) {
        return (
            <div>
                <h1>{countries[0].name}</h1>
                <p>Capital {countries[0].capital}</p>
                <p>Area {countries[0].area}</p>
                <p>Population {countries[0].population}</p>
                <h2>Languages</h2>
                <ul>
                    {countries[0].languages.map(language =>
                        <li key={language.name}>{language.name}</li>
                    )}
                </ul>
                <img src={countries[0].flag} width={100} height={100} alt='kuva'/>
            </div>
        )
    }
    else {
        return (
            <div>

            </div>
        )
    }
}

const CountryButton = ({country, setFilter}) => {
    
    const handleButtonClick = () => {
        setFilter(country.name)
    }

    return (
        <button onClick={handleButtonClick}>Show</button>
    )
}

export default App
import React from "react";

const Country = ({ country }) => (
    <div>
        <h1>{country.name}</h1>
        <b>Capital:</b> {country.capital}<br />
        <b>Polulation:</b> {country.population}<br />
        <p><b>Languages:</b></p>
        <ul>
            {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
        </ul>
        <img src={country.flag} height="100px" alt={`flag of ${country.name}`} />
    </div>
)

export default Country
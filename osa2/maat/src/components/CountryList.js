import React from "react";

const CountryList = (props) => {
    return (
        <div>
            {props.countries.map(country => <p key={country.name}>{country.name}</p>)}
        </div>
    )
}

export default CountryList
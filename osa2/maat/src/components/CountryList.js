import React from "react";

const CountryList = (props) => {
    return (
        <div>
            {props.countries.map(country => <p key={country.name}>{country.name} <button value={country.name} onClick={props.showAction}>show</button></p>)}
        </div>
    )
}

export default CountryList
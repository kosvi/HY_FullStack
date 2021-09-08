import React from 'react'
import CountryList from './CountryList'
import Country from './Country'

const Content = (props) => {
    const filteredList = props.countries.filter(country => country.name.toString().toLowerCase().includes(props.searchString))

    if (props.searchString.length < 1) {
        return (
            <div>
                type something to search
            </div>
        )
    }
    if (filteredList.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
    if (filteredList.length === 1) {
        return (
            <div>
                <Country country={filteredList[0]} />
            </div>
        )
    }
    return (
        <CountryList countries={filteredList} />
    )
}

export default Content
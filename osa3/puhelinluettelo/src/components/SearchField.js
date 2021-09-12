import React from 'react'

const SearchField = (props) => {
    return (
        <div>
            filter phonebook <input value={props.value} onChange={props.action} />
        </div>
    )
}

export default SearchField
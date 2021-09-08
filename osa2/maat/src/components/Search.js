import React from "react";

const Search = (props) => (
    <div>
        find countries 
        <input value={props.value} onChange={props.action} />
    </div>
)

export default Search
import React from 'react'

const Button = (props) => (
    <button onClick={props.kahva}>
        {props.teksti}
    </button>
)

export default Button
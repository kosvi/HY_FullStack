import React from 'react'

const Anecdote = (props) => (
    <>
        <p>
            {props.anecdote}
        </p>
        <p>
            has {props.votes} votes
        </p>
    </>
)

export default Anecdote
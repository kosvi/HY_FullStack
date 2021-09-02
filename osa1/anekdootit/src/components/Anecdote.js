import React from 'react'

const Anecdote = (props) => {
    if (props.votes >= 0) {
        return (
            <>
                <p>
                    {props.anecdote}
                </p>
                <p>
                    has {props.votes} votes
                </p>
            </>
        )
    }
    return (
        <p>
            No votes given yet.
        </p>
    )
}

export default Anecdote
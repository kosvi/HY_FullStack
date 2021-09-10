import React from 'react'

const Person = ({ person, deleteAction }) => (
    <p>
        {person.name} {person.number} <button onClick={() => deleteAction(person.name, person.id)}>delete</button>
    </p>
)

export default Person
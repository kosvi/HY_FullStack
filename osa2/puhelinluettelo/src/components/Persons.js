import React from "react";
import Person from "./Person";

const Persons = ({ persons, filterString, deleteAction }) => (
    <div>
        {
            persons.filter(
                person => person.name.toLowerCase().includes(filterString.toLowerCase())
            )
                .map(
                    person => <Person key={person.name} person={person} deleteAction={deleteAction} />
                )
        }
    </div>
)

export default Persons
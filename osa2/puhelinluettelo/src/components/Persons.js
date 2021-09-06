import React from "react";
import Person from "./Person";

const Persons = ({ persons, filterString }) => (
    <div>
        {
            persons.filter(
                person => person.name.toLowerCase().includes(filterString.toLowerCase())
            )
                .map(
                    person => <Person key={person.name} person={person} />
                )
        }
    </div>
)

export default Persons
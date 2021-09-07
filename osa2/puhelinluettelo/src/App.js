import React, { useEffect, useState } from 'react'
import SearchField from './components/SearchField'
import PersonAdder from './components/PersonAdder'
import Persons from './components/Persons'
import DB from './api/DB'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const personsFromApi = await DB.getPersons()
        if (personsFromApi !== null)
          setPersons(personsFromApi)
      } catch (error) {
        console.log('no persons could be downloaded')
      }
    }
    fetchData()
  }, [])

  const nameAdder = (event) => {
    event.preventDefault()
    // Let's see if name already exists
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    if (persons.some(person => person.name === newName)) {
      // Name already exists -> show error
      alert(`${newName} is already added to phonebook`)
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
  }

  const filterStringChanger = (event) => {
    setFilterString(event.target.value)
  }

  const nameChanger = (event) => {
    setNewName(event.target.value)
  }

  const numberChanger = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchField
        value={filterString}
        action={filterStringChanger}
      />

      <h3>Add new person</h3>
      <PersonAdder
        nameAdder={nameAdder}
        newName={newName}
        nameChanger={nameChanger}
        newNumber={newNumber}
        numberChanger={numberChanger}
      />

      <h3>Numbers</h3>
      <Persons
        persons={persons}
        filterString={filterString}
      />
    </div>
  )

}

export default App
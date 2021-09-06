import React, { useState } from 'react'
import Person from './components/Person'
import SearchField from './components/SearchField'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '0401234567' },
    { name: 'Foo Bar', number: '1337 h4x0r' },
    { name: 'Nukku Matti', number: '1-2-3-4-5-6-7-8-9' },
    { name: 'Foolish Azkabar', number: '030-8312495' }
  ])
  const [filterString, setFilterString] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      <SearchField value={filterString} action={filterStringChanger} />
      <form onSubmit={nameAdder}>
        <div>
          name: <input value={newName} onChange={nameChanger} />
        </div>
        <div>
          number: <input value={newNumber} onChange={numberChanger} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase())).map(person => <Person key={person.name} person={person} />)
      }
    </div>
  )

}

export default App
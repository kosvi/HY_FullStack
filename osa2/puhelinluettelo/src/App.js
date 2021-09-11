import React, { useEffect, useState } from 'react'
import SearchField from './components/SearchField'
import PersonAdder from './components/PersonAdder'
import Persons from './components/Persons'
import personService from './services/persons'
import Message from './components/Message'

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await personService.getAll()
        setPersons(data)
      } catch (error) {
        console.log(error, 'no persons could be downloaded')
      }
    }
    fetchData()
  }, [])

  const updateMessage = (newMessage) => {
    setMessage(newMessage)
    setTimeout(() => setMessage(null), 5000)
  }

  // this function needs some refactoring...
  const nameAdder = async (event) => {
    event.preventDefault()
    // Let's see if name already exists
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    if (persons.some(person => person.name === newName)) {
      // Name already exists -> ask to update
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        personToUpdate.name = newName
        personToUpdate.number = newNumber
        // return value 0 = ok, <0 = failure
        if (await updatePerson(personToUpdate) < 0) {
          updateMessage(`${newName} has already been deleted from the server`)
          setPersons(persons.filter(person => person.id !== personToUpdate.id))
          return
        }
        setNewName('')
        setNewNumber('')
        updateMessage(`${newName} was updated`)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    try {
      const responseData = await personService.addPerson(newPerson)
      setPersons(persons.concat(responseData))
      setNewName('')
      setNewNumber('')
      updateMessage(`${newName} was added`)
    } catch (error) {
      console.log(error, 'couldn\'t add a new person')
    }
  }

  const nameEraser = async (name, id) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }
    try {
      await personService.deletePerson(id)
      setPersons(persons.filter(person => person.id !== id))
      updateMessage(`${name} was deleted`)
    } catch (error) {
      console.log(error, 'couldn\'t delete the person')
    }
  }

  const updatePerson = async (person) => {
    try {
      const responseData = await personService.updatePerson(person)
      if (responseData === null) {
        return -1
      }
      setPersons(persons.map(p => p.id !== person.id ? p : responseData))
      return 0
    } catch (error) {
      console.log(error, 'coudn\'t update the person')
      return -1
    }
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
      <Message message={message} />
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
        deleteAction={nameEraser}
      />
    </div>
  )

}

export default App
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
        await updatePerson(personToUpdate)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    try {
      const responseData = await personService.addPerson(newPerson)
      if (responseData.status === 200) {
        setPersons(persons.concat(responseData.data))
        setNewName('')
        setNewNumber('')
        updateMessage(`${newName} was added`)
      } else if (responseData.status === 400) {
        updateMessage(responseData.data.error)
      } else {
        updateMessage('unknown error')
      }
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

  const updatePerson = async (personToUpdate) => {
    try {
      const responseData = await personService.updatePerson(personToUpdate)
      if (responseData.status === 404) {
        // already deleted
        updateMessage(`${personToUpdate.name} has already been deleted from the server`)
        setPersons(persons.filter(person => person.id !== personToUpdate.id))
        return
      }
      // if I comment out this else if 
      // the number won't update in the list if it's too short
      // but I can't see why the number updates in the list if backend doesn't accept the update
      else if (responseData.status === 400) {
        console.log('person wasn\'t updated')
        updateMessage(responseData.data.error)
      }
      else if (responseData.status !== 400) {
        setPersons(persons.map(p => p.id !== personToUpdate.id ? p : responseData))
        setNewName('')
        setNewNumber('')
        updateMessage(`${personToUpdate.name} was updated`)
        return
      }
    } catch (error) {
      console.log(error, 'coudn\'t update the person')
      //      return null
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
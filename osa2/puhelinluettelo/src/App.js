import { useState, useEffect } from 'react'
import PersonService from './services/persons'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newMessage, setNewMessage] = useState({msg : null, state : false})

  const handleName = (e) => setNewName(e.target.value)
  const handleNumber = (e) => setNewNumber(e.target.value)
  const handleFilter = (e) => setNewFilter(e.target.value)

  useEffect(() => {
    PersonService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()

    if (persons.some((p) => p.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, add new number?`)){
        let person = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        let newPerson = {...person, number: newNumber}

        PersonService
          .update(newPerson.id, newPerson)
          .then(response => 
            setPersons(persons.map(p => p.id !== newPerson.id ? p : response)))
          .then(setNewMessage({msg:`${newPerson.name} number updated`, state:true}))
          .then(setTimeout(() => {
            setNewMessage({...newMessage, msg: null})
          }, 2000))
          .catch(error => {
            console.log('error', error)
            setNewMessage({msg: `${newPerson.name} was already removed from the server`, state: false})
            setTimeout(() => {
              setNewMessage({...newMessage, msg: null})
            }, 2000)
          })

      }
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      PersonService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
        .then(setNewMessage({msg:`${personObject.name} added`, state:true}))
          .then(setTimeout(() => {
            setNewMessage({...newMessage, msg: null})
          }, 2000))

    }

    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (name, id) => {

    if(window.confirm(`really delete ${name}?`)){
      PersonService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .then(setNewMessage({msg:`${name} removed`, state:true}))
          .then(setTimeout(() => {
            setNewMessage({...newMessage, msg: null})
          }, 2000))
        .catch(error => {
          setNewMessage({msg: `${name} was already removed from the server`, state: false})
          setTimeout(() => {
            setNewMessage({...newMessage, msg: null})
          }, 2000)
        })
    }
  }

  let filteredPersons = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage}/>
      <Filter handleFilter={handleFilter} newFilter={newFilter}/>

      <h2>Add new</h2>
      <PersonForm addPerson={addPerson} handleName={handleName} handleNumber={handleNumber} newName={newName} newNumber={newNumber}/>

      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )

}

const Filter = ({handleFilter, newFilter}) => {
  return(
    <div>
      filter shown with <input onChange={handleFilter} value={newFilter} />
    </div>
  )
}

const PersonForm = ({ addPerson, handleName, handleNumber, newName, newNumber}) => {
  return (
    <div>
      <form onSubmit={addPerson}>

        <div>
          name: <input onChange={handleName} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = ({filteredPersons, deletePerson}) => {
  return(
    <div>
      {filteredPersons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson}/>)}
    </div>
  )
}

const Person = ({person, deletePerson}) => {
  return(
    <div>
      {person.name} {person.number}
      <button onClick={() => deletePerson(person.name, person.id)}>delete</button>
    </div>
  )
}


export default App
import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'

const Person = ({person, handleDelete}) => {
    
  return(
    <li key={person.name}>{person.name} {person.number} <button onClick={(event) => handleDelete(event, person)}>delete</button></li>
  )
}

const Persons = ({persons, filterValue, handleDelete}) => {
    
  return(
    <ul>
      {persons
        .filter(person => person.name.toLowerCase()
        .includes(filterValue.toLowerCase())).map(person => <Person key={person.name} person={person} handleDelete={handleDelete}/>)}
  </ul>
  )
}

const PersonForm = ({onSubmit, valueName, onChangeName, valueNumber, onChangeNumber}) => {
  return(
    <form onSubmit={onSubmit}>
        <div>
          name: <input 
                  value={valueName}
                  onChange={onChangeName}
                />
        </div>
        <div>
          number: <input 
                  value={valueNumber}
                  onChange={onChangeNumber}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Filter = ({value, onChange}) => {
  return(
    <form>
    <div>
      name: <input 
              value={value}
              onChange={onChange}
            />
    </div>
  </form>
  )
}


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  useEffect(() => {
    console.log('effect')

    personService
      .getAll()
      .then(initialData => {
        setPersons(initialData)
      })
  }, [])
  console.log('render', persons.length, 'notes')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      /*id: persons.length+1*/    //let the server generate a new id
    }

    const personsFilterd = persons.filter(person => person.name === newName)
    if(personsFilterd.length>0){
      const oldPerson = personsFilterd[0]    

      if (window.confirm(`${newName} is already added in the phonebook, replace the old number with a new one?`)) {
        console.log(`update ${oldPerson.id}`)
        personService
          .update(oldPerson.id, personObject)
          .then(() => {
            setPersons(persons.map(person => person.id !== oldPerson.id ? person : personObject))
            setNewName('');
            setNewNumber('');
          })
      }
      return //always return at this point because updated or not, i can't put a new person with an existent id
    }

     personService
      .create(personObject)
      .then(person => {
         setPersons(persons.concat(person))
         setNewName('')
         setNewNumber('')
        })
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewFilterName(event.target.value)
  }

  const handleDelete = (event, personToDelete) => {
    event.preventDefault()
    console.log(event.target.value)

    if (window.confirm(`Delete ${personToDelete.name}`)) {
      console.log(`delete ${personToDelete.id}`)
      personService
        .remove(personToDelete.id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
    }
  }

  return (
    <div>
      <h2>Filter</h2>
      <Filter value={newFilterName} onChange={handleFilterNameChange}/>
      <h2>Phonebook</h2>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} filterValue={newFilterName} handleDelete={handleDelete}/>
      </ul>
    </div>
  )
}

export default App
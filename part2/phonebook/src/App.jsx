import { useState, useEffect } from 'react'
import axios from 'axios'

const Person = ({person}) => {
    
  return(
    <li key={person.name}>{person.name} {person.number}</li>
  )
}

const Persons = ({persons, filterValue}) => {
    
  return(
    <ul>
      {persons
        .filter(person => person.name.toLowerCase()
        .includes(filterValue.toLowerCase())).map(person => <Person key={person.name} person={person}/>)}
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
  
  /*const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')


  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      /*id: persons.length+1    //let the server generate a new id*/
    }

    if(persons.filter(person => person.name === newName).length>0){
      alert(`${newName} is already added to phonebook`);
      return
    }
    
    /*setPersons(persons.concat(personObject))*/

    axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
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

  return (
    <div>
      <h2>Filter</h2>
      <Filter value={newFilterName} onChange={handleFilterNameChange}/>
      <h2>Phonebook</h2>
      <PersonForm onSubmit={addPerson} valueName={newName} onChangeName={handleNameChange} valueNumber={newNumber} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} filterValue={newFilterName}/>
      </ul>
    </div>
  )
}

export default App
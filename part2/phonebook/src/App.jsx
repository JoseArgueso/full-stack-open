import { useState } from 'react'

const App = () => {
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  //const [personsFiltered, setPersonsFiltered] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilterName, setNewFilterName] = useState('')

  const Person = ({person}) => {
    
    return(
      <li key={person.name}>{person.name} {person.number}</li>
    )
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }

    if(persons.filter(person => person.name === newName).length>0){
      alert(`${newName} is already added to phonebook`);
      return
    }
    
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
    console.log(event.target.value)
    setNewFilterName(event.target.value)
//    setPersonsFiltered(persons.filter(person => person.name.includes(newFilterName)))
  }

  return (
    <div>
      <h2>Filter</h2>
      <form>
        <div>
          name: <input 
                  value={newFilterName}
                  onChange={handleFilterNameChange}
                />
        </div>
      </form>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}
                />
        </div>
        <div>
          number: <input 
                  value={newNumber}
                  onChange={handleNumberChange}
                />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {/*persons.map(person => <Person key={person.name} person={person}/>)*/}
        {persons
          .filter(person => person.name.toLowerCase()
          .includes(newFilterName.toLowerCase())).map(person => <Person key={person.name} person={person}/>)}
      </ul>
    </div>
  )
}

export default App
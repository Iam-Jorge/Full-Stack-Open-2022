import { useState, useEffect } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [personsToShow, setPersonsToShow] = useState([]);
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons  => {
        setPersons(initialPersons)
        setPersonsToShow(initialPersons)
      })
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id).then((response) => {
        const updatedPersons = persons.filter((person) => person.id !== id);
        setPersons(updatedPersons);
        setPersonsToShow(updatedPersons);
        setMessage(`Removed ${name} from phonebook`);
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault()
    // Checks if the person already exists in the phonebook
    if (persons.some(p => p.name.toLowerCase() === newPerson.name.toLowerCase())) {
      setMessage(`${newPerson.name} is already added to phonebook, replace the old number with new one?`);
      // Finds the person by name and returns an object with all the data
      const currentPerson = persons.filter(
        (p) => p.name === newPerson.name
      )

      personService
        .update(currentPerson[0].id, newPerson)
        .then((returnedPerson) => {
        // Checks the id of the returned person and creates a new list with the update number
          const updatedPersons = persons.map((person) =>
            person.id !== returnedPerson.id ? person : returnedPerson
          );
          setPersons(updatedPersons);
          setPersonsToShow(updatedPersons);
          setMessage(`Updated ${newPerson.name}'s number`);
          setNewPerson({ name: "", number: "" });
      }).catch((error) => setMessage(error.response.data.error));
    } else {
      const objectPerson = {
        name: newPerson.name,
        number: newPerson.number,
        id: persons.length +1
      }
  
      personService
        .create(objectPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setPersonsToShow(persons.concat(returnedPerson));
          setMessage(`Added ${newPerson.name} to phonebook`);
          setNewPerson({ name: "", number: "" });
        })
        .catch((error) => setMessage(error.response.data.error));
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    setNewPerson({...newPerson, [event.target.name]: value });
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
    setPersonsToShow(
      persons.filter((person) => person.name.toLowerCase().includes(filter))
    );
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Filter filter={filter} handleFilter={handleFilter}></Filter>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newPerson={newPerson} handleChange={handleChange}></PersonForm>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} persons={persons} filter={filter} deletePerson={deletePerson}></Persons>
    </div>
  )
}

export default App
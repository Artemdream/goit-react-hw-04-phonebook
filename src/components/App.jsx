import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import './App.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = (newContact, { action }) => {
    const duplicateContact = contacts.map(el => el.name.toLocaleLowerCase());

    return duplicateContact.includes(newContact.name.toLocaleLowerCase())
      ? alert(`${newContact.name} is already in contacts.`)
      : setContacts(contacts => [newContact, ...contacts], action.resetForm());
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filterContacts = e => {
    setFilter(e.target.value);
  };

  const getVisibleContact = () => {
    const normilizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normilizedFilter)
    );
  };

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addNewContact} />
      <Filter value={filter} onChange={filterContacts} />
      <h2>Contacts</h2>
      <ContactList
        contacts={getVisibleContact()}
        onDeleteContact={deleteContact}
      />
    </div>
  );
};

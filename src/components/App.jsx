import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
import { useDispatch, useSelector } from 'react-redux';
import { filterContacts, deleteContact } from '../store/actions';
import { fetchContacts, saveContact, removeContact } from 'store/reducer';

export const App = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const inputRef = useRef();
  const nameId = useRef(nanoid());
  const numberId = useRef(nanoid());
  const filterId = useRef(nanoid());

  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts);
  const setDelete = (payload) => dispatch(deleteContact(payload));
  const setFilter = (payload) => dispatch(filterContacts(payload));
  const filter = useSelector(state => state.contacts.filter);
  const getContactsFromApi = () => dispatch(fetchContacts());
  const saveContactsInApi = (payload) => dispatch(saveContact(payload));
  const removeContactsFromApi = (payload) => dispatch(removeContact(payload));

  useEffect(() => {
    getContactsFromApi();
    inputRef.current.focus();
    // eslint-disable-next-line
  },[]);

  const handleSubmit = ev => {
    ev.preventDefault();
    if (contacts.items.some(contact => contact.number === number)) {
      alert('This number is already in contacts');
    } else {
      const newContacts = { id: nanoid(), name: name, number: number };
      saveContactsInApi(newContacts);
      setName('');
      setNumber('');
      }
  };
  
  const handleSetName = ev => {
    setName(ev.target.value);
  };

  const handleSetPhone = ev => {
    setNumber(ev.target.value);
  };

  const handleSetFilter = ev => {
    setFilter(ev.target.value);
  };

  const deleteHandler = id => {
    setDelete(id);
    removeContactsFromApi(id);
  };

  return (
    <>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <ContactForm
          inputRef={inputRef}
          formId={nameId.current}
          type="text"
          inputName="Name"
          value={name}
          setName={handleSetName}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
        <ContactForm
          formId={numberId.current}
          type="tel"
          inputName="Phone"
          value={number}
          setName={handleSetPhone}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        />
        <button type="submit">Add contact</button>
      </form>
      <h1>Contacts</h1>
      <Filter
        setName={handleSetFilter}
        inputId={filterId.current}
        type="text"
        inputName="Filter"
        value={filter}
      />
      <ContactList contacts={contacts} filter={filter} deleteHandler={deleteHandler}/>
    </>
  );
}

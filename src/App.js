import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Container from './components/Container';
import { SectionTitle } from 'components/SectionTitle';
import { ContactForm } from 'components/ContactForm';
import { ContactList } from 'components/ContactList';
import Filter from './components/Filter';
import IconButton from './components/IconButton';
import { ReactComponent as AddIcon } from './icons/add.svg';
import Modal from './components/Modal';

const App = () => {
  const [filter, setFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts')) ?? [];
    setContacts(parsedContacts);
  }, []);

  const addContact = opt => {
    const newContact = {
      id: nanoid(),
      name: opt.name,
      number: opt.number,
    };

    const hasContact = contacts.find(option => option.name === newContact.name);
    if (hasContact === undefined) {
      setContacts(prevContacts => [newContact, ...prevContacts]);
    } else {
      alert(`${newContact.name} is already in contacts?`);
    }

    toggleModal();
  };

  const deleteContact = contactId => {
    console.log(contactId);
    setContacts( () => 
      contacts.filter(contact => contact.id !== contactId),
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleConcats = () => {
    const normalizedFilter = filter.toLowerCase();

    return normalizedFilter
      ? contacts.filter(contact => {
          return contact.name.includes(normalizedFilter);
        })
      : contacts;
  };

  const visibleContacts = getVisibleConcats();

  return (
    <Container>
      <SectionTitle title={'Phonebook'}></SectionTitle>
      <IconButton onClick={toggleModal} aria-label="Add contact">
        <AddIcon width="40" height="40" fill="#fff" />
      </IconButton>
      {showModal && (
        <Modal onClose={toggleModal}>
          <ContactForm onSubmit={addContact}></ContactForm>
        </Modal>
      )}
      <SectionTitle title={'Contacts'}></SectionTitle>
      <Filter value={filter} onChange={changeFilter} />
      {contacts !== undefined ? (
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={deleteContact}
        />
      ) : (
        ''
      )}
    </Container>
  );
};

export default App;

// class App extends Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//     showModal: false,
//   };

//   componentDidMount() {
//     const contacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(contacts);

//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const nextContacts = this.state.contacts;
//     const prevContacts = prevState.contacts;

//     if (nextContacts !== prevContacts) {
//       console.log('Обновилось поле сontacts, записываю todos в хранилище');
//       localStorage.setItem('contacts', JSON.stringify(nextContacts));
//     }

//     if (
//       nextContacts.length > prevContacts.length &&
//       prevContacts.length !== 0
//     ) {
//       this.toggleModal();
//     }
//   }

//   addContact = opt => {
//     const contact = {
//       id: nanoid(),
//       name: opt.name,
//       number: opt.number,
//     };
//     console.log(opt);

//     const hasContact = this.state.contacts.find(
//       option => option.name === contact.name
//     );
//     if (hasContact === undefined) {
//       this.setState(({ contacts }) => ({
//         contacts: [contact, ...contacts],
//       }));
//     } else {
//       alert(`${contact.name} is already in contacts?`);
//     }
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   getVisibleConcats = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   toggleModal = () => {
//     this.setState(({ showModal }) => ({
//       showModal: !showModal,
//     }));
//   };

//   render() {
//     const { contacts, filter, showModal } = this.state;
//     const visibleContacts = this.getVisibleConcats();

//     return (
//       <Container>
//         <SectionTitle title={'Phonebook'}></SectionTitle>
//         <IconButton onClick={this.toggleModal} aria-label="Add contact">
//           <AddIcon width="40" height="40" fill="#fff" />
//         </IconButton>
//         {showModal && (
//           <Modal onClose={this.toggleModal}>
//             <ContactForm onSubmit={this.addContact}></ContactForm>
//           </Modal>
//         )}
//         <SectionTitle title={'Contacts'}></SectionTitle>
//         <Filter value={filter} onChange={this.changeFilter} />
//         {contacts !== undefined ? (
//           <ContactList
//             contacts={visibleContacts}
//             onDeleteContact={this.deleteContact}
//           />
//         ) : (
//           ''
//         )}
//       </Container>
//     );
//   }
// }

// export default App;

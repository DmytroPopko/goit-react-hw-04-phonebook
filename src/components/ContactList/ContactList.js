import React from 'react';
import './ContactcList.scss';
import PropTypes from 'prop-types';
import IconButton from '../../components/IconButton';
import { ReactComponent as DelIcon } from '../../icons/delete.svg';

const ContactList = ({ contacts, onDeleteContact }) => (
  <ul className="ContactList">
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
        <IconButton
          className="IconButtonDelete"
          onClick={() => onDeleteContact(id)}
          aria-label="Delete contact"
        >
          <DelIcon width="15" height="15" fill="#fff" />
        </IconButton>
      </li>
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
};

export default ContactList;

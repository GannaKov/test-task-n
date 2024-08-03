/* eslint-disable react/prop-types */

import ContactCard from "../ContactCard/ContactCard";

const ContactsList = ({ contacts }) => {
  return (
    <ul>
      {contacts.map((contact) => {
        return (
          <li key={contact.id}>
            <ContactCard contact={contact} />
          </li>
        );
      })}
    </ul>
  );
};

export default ContactsList;

/* eslint-disable react/prop-types */

import ContactCard from "../ContactCard/ContactCard";
import styles from "./ContactList.module.css";

const ContactsList = ({ contacts }) => {
  return (
    <ul className="container">
      {contacts.map((contact) => (
        <li className={styles.contactListItem} key={contact.id}>
          <ContactCard contact={contact} />
        </li>
      ))}
    </ul>
  );
};

export default ContactsList;

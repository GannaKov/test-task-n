/* eslint-disable react/prop-types */

import ContactCard from "../ContactCard/ContactCard";
import styles from "./ContactList.module.css";

const ContactsList = ({ contacts }) => {
  return (
    <>
      <div className="container">
        <div className={styles.contactListWrp}>
          <h3 className={styles.sectionTitle}> Contacts</h3>

          {contacts.map((contact) => (
            <div className={styles.contactListItem} key={contact.id}>
              <ContactCard contact={contact} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactsList;

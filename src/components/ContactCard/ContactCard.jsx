/* eslint-disable react/prop-types */
import { Form, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import styles from "./ContactCard.module.css";
import Avatar from "@mui/material/Avatar";
import TagsBlock from "../Shared/TagsBlock/TagsBlock";

const ContactCard = ({ contact }) => {
  const lastName = contact.fields?.["last name"]?.[0]?.value || "";

  const firstName = contact.fields?.["first name"]?.[0]?.value || "";

  const email = contact.fields?.email?.[0]?.value || "";

  const avatar =
    contact.avatar_url || `https://robohash.org/${contact.id}.png?size=200x200`;

  const tags = contact.tags.map((tag) => tag.tag);
  // const tags = Object.keys(contact.tags);
  console.log("tags", tags);
  return (
    <Card
      sx={{
        backgroundColor: "#EDEDED",
        padding: "1rem 2rem 1rem 1rem",
        position: "relative",
      }}
    >
      <Link to={`contact/${contact.id}`} className={styles.cardWrp}>
        <Avatar
          src={avatar}
          alt={`${firstName}${lastName}`}
          sx={{ width: 59, height: 59, border: 1 }}
        />
        <ul className={styles.infoWrp}>
          <li className={styles.infoItem}>
            {firstName && <span>{firstName}&nbsp;</span>}
            {lastName && <span>{lastName}</span>}
          </li>
          <li className={styles.infoItem}>{email && <p>{email}</p>}</li>
          <li className={styles.infoItem}>
            {tags.length > 0 && (
              <div className={styles.tagsWrp}>
                {tags.length > 0 && <TagsBlock tags={tags} />}
              </div>
            )}
          </li>
        </ul>
      </Link>
      <Form
        method="post"
        action={`destroy/${contact.id}`}
        onSubmit={(event) => {
          if (!confirm("Please confirm you want to delete this record.")) {
            event.preventDefault();
          }
        }}
      >
        <button className={styles.deleteBtn} type="submit">
          <HighlightOffIcon />
        </button>
      </Form>
    </Card>
  );
};

export default ContactCard;

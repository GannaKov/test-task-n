/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";

import styles from "./SingleContactCard.module.css";
import Avatar from "@mui/material/Avatar";
import TagsBlock from "../Shared/TagsBlock/TagsBlock";

const SingleContactCard = ({ contact, tags }) => {
  console.log("tags in comp", tags);
  const lastName = contact.fields?.["last name"]?.[0]?.value || "";

  const firstName = contact.fields?.["first name"]?.[0]?.value || "";

  const email = contact.fields?.email?.[0]?.value || "";

  const avatar =
    contact.avatar_url || `https://robohash.org/${contact.id}.png?size=200x200`;
  return (
    <Card
      //   variant="outlined"
      sx={{
        backgroundColor: "#FFFFFF",
        padding: "1rem 0",
        position: "relative",
        marginBottom: "2rem",
        maxWidth: "500px",
      }}
    >
      <div className={styles.cardWrp}>
        <Avatar
          src={avatar}
          alt={`${contact.fields["last name"]?.value}${contact.fields["first name"]?.value}`.trim()}
          sx={{ width: 83, height: 83, border: 1 }}
        />
        <ul className={styles.infoWrp}>
          <li className={styles.infoItem}>
            {firstName && <span>{firstName}&nbsp;</span>}
            {lastName && <span>{lastName}</span>}
          </li>
          <li className={styles.infoItem}>{email && <p>{email}</p>}</li>
        </ul>
      </div>
      <div className={styles.infoItem}>
        <h3 className={styles.sectionTitle}>Tags</h3>
        {tags.length > 0 && <TagsBlock tags={tags} />}
      </div>
    </Card>
  );
};

export default SingleContactCard;

/* eslint-disable react/prop-types */
import { Form, Link } from "react-router-dom";

const ContactCard = ({ contact }) => {
  const lastName = contact.fields?.["last name"]?.[0]?.value || "";

  const firstName = contact.fields?.["first name"]?.[0]?.value || "";

  const email = contact.fields?.email?.[0]?.value || "";

  const avatar =
    contact.avatar_url || `https://robohash.org/${contact.id}.png?size=200x200`;

  const tags = contact.tags;
  return (
    <div>
      <Form
        method="post"
        action={`destroy/${contact.id}`}
        onSubmit={(event) => {
          if (!confirm("Please confirm you want to delete this record.")) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
      </Form>
      <Link to={`contact/${contact.id}`}>
        <img
          src={avatar}
          alt={`${contact.fields["last name"]?.value}${contact.fields["first name"]?.value}`.trim()}
        />
        {email && <p>{email}</p>}
        {firstName && <p>{firstName}</p>}
        {lastName && <p>{lastName}</p>}
        {tags.length > 0 && (
          <p>
            {tags.map((tag) => (
              <span key={tag.id}>{tag.tag}</span>
            ))}
          </p>
        )}
      </Link>
    </div>
  );
};

export default ContactCard;

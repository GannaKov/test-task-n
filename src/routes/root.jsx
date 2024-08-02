import { Form, Link, useLoaderData } from "react-router-dom";
import { getContacts } from "../services/requests";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export default function Root() {
  const { contacts } = useLoaderData();
  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form method="post" id="contact-form">
            <p>
              <span>Name</span>
              <input
                placeholder="First name"
                aria-label="First name"
                type="text"
                name="first"
                // defaultValue={contact?.first}
              />
              <input
                placeholder="Last name"
                aria-label="Last name"
                type="text"
                name="last"
                // defaultValue={contact?.last}
              />
            </p>
            <label>
              <span>Email</span>
              <input
                type="text"
                name="email"
                placeholder="enter email"
                // defaultValue={contact?.twitter}
              />
            </label>
            <label>
              <span>Avatar URL</span>
              <input
                placeholder="https://example.com/avatar.jpg"
                aria-label="Avatar URL"
                type="text"
                name="avatar"
                // defaultValue={contact?.avatar}
              />
            </label>
            <label>
              <span>Tags</span>
              <input
                aria-label="Tags"
                type="text"
                name="tag"
                // defaultValue={contact?.avatar}
              />
            </label>
            <p>
              <button type="submit">Save</button>
              <button type="button">Cancel</button>
            </p>
          </Form>
        </div>
      </div>
      <div>
        <ul>
          {contacts.map((contact) => {
            // const lastName = contact.fields["last name"][0]?.value || "";
            const lastName =
              contact.fields["last name"] &&
              contact.fields["last name"].length > 0
                ? contact.fields["last name"][0].value
                : "";
            // const firstName = contact.fields["first name"][0].value || "";
            const firstName =
              contact.fields["first name"] &&
              contact.fields["first name"].length > 0
                ? contact.fields["first name"][0].value
                : "";
            const email = contact.fields.email[0].value;
            const avatar =
              contact.avatar_url ||
              `https://robohash.org/${contact.id}.png?size=200x200`;
            const tags = contact.tags;
            return (
              <li key={contact.id}>
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
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

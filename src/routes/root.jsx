import { Link, useLoaderData } from "react-router-dom";
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
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
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

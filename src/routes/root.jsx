import { Form, Link, useLoaderData, redirect } from "react-router-dom";
import { createContact, getContacts } from "../services/requests";
import ContactsList from "../components/ContactsList/ContactsList";

export async function loader() {
  const contacts = await getContacts();
  return { contacts };
}

export async function action({ request }) {
  const formData = await request.formData();

  const contactData = Object.fromEntries(formData);
  const contactWithAdditionalFields = {
    fields: {
      email: [
        {
          value: contactData.email,
        },
      ],
      "first name": [
        {
          value: contactData["first name"],
        },
      ],
      "last name": [
        {
          value: contactData["last name"],
        },
      ],
    },
    record_type: "person",
    privacy: {
      edit: null,
      read: null,
    },
    owner_id: null,
  };
  console.log("contactWithAdditionalFields ", contactWithAdditionalFields);
  await createContact(contactWithAdditionalFields);
  return redirect("/");
}

export default function Root() {
  const { contacts } = useLoaderData();

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form method="post" id="contact-form">
            <label>First Name</label>
            <input
              placeholder="First name"
              aria-label="First name"
              type="text"
              name="first name"
            />
            <label>Last Name</label>
            <input
              placeholder="Last name"
              aria-label="Last name"
              type="text"
              name="last name"
              // defaultValue={contact?.last}
            />

            <label>Email</label>
            <span>Email</span>
            <input
              type="text"
              name="email"
              placeholder="enter email"
              // defaultValue={contact?.twitter}
            />

            <p>
              <button type="submit">Add Contact</button>
            </p>
          </Form>
        </div>
      </div>
      <div>
        <ContactsList contacts={contacts} />
        {/* <ul>
          {contacts.map((contact) => {
            const lastName = contact.fields?.["last name"]?.[0]?.value || "";

            const firstName = contact.fields?.["first name"]?.[0]?.value || "";

            const email = contact.fields?.email?.[0]?.value || "";

            const avatar =
              contact.avatar_url ||
              `https://robohash.org/${contact.id}.png?size=200x200`;

            const tags = contact.tags;
            return (
              <li key={contact.id}>
                <Form
                  method="post"
                  action={`destroy/${contact.id}`}
                  onSubmit={(event) => {
                    if (
                      !confirm("Please confirm you want to delete this record.")
                    ) {
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
              </li>
            );
          })}
        </ul> */}
      </div>
    </>
  );
}

import { useLoaderData, redirect } from "react-router-dom";
import { createContact } from "../services/requests";
import ContactsList from "../components/ContactsList/ContactsList";
import CreateForm from "../components/CreateForm/CreateForm";

// export async function loader() {
//   const contacts = await getContacts();
//   return { contacts };
// }

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
        <h1>Contacts</h1>
        <CreateForm />
        {/* <Form method="post" id="contact-form">
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
        </Form> */}

        <ContactsList contacts={contacts} />
      </div>
    </>
  );
}

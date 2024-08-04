import { useLoaderData, redirect } from "react-router-dom";
import { createContact } from "../services/requests";
import ContactsList from "../components/ContactsList/ContactsList";
import CreateForm from "../components/CreateForm/CreateForm";

// export async function loader() {
//   const contacts = await getContacts();
//   return { contacts };
// }

// export async function action({ request }) {
//   const formData = await request.formData();

//   const contactData = Object.fromEntries(formData);
//   const contactWithAdditionalFields = {
//     fields: {
//       email: [
//         {
//           value: contactData.email,
//         },
//       ],
//       "first name": [
//         {
//           value: contactData["first name"],
//         },
//       ],
//       "last name": [
//         {
//           value: contactData["last name"],
//         },
//       ],
//     },
//     record_type: "person",
//     privacy: {
//       edit: null,
//       read: null,
//     },
//     owner_id: null,
//   };
//   console.log("contactWithAdditionalFields ", contactWithAdditionalFields);
//   await createContact(contactWithAdditionalFields);

//   return redirect("/");
// }

export default function Root() {
  const { contacts } = useLoaderData();

  return (
    <div className="pageWrapper">
      <div className="section">
        <CreateForm />
      </div>

      <div className="section">
        <ContactsList contacts={contacts} />
      </div>
    </div>
  );
}

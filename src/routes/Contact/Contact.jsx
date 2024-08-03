import { useLoaderData } from "react-router-dom";
import { getContactById } from "../../services/requests";

export async function loader({ params }) {
  // console.log("params", params);
  const result = await getContactById(params.contactId);
  return { result };
}

export default function Contact() {
  const { result } = useLoaderData();
  const contact = result?.length > 0 ? result[0] : [];

  console.log("result", result);
  console.log("contact", contact);
  const lastName =
    contact.fields["last name"] && contact.fields["last name"].length > 0
      ? contact.fields["last name"][0].value
      : "";
  // const firstName = contact.fields["first name"][0].value || "";
  const firstName =
    contact.fields["first name"] && contact.fields["first name"].length > 0
      ? contact.fields["first name"][0].value
      : "";
  const email =
    contact.fields.email && contact.fields.email.length > 0
      ? contact.fields.email[0].value
      : "";
  const avatar =
    contact.avatar_url || `https://robohash.org/${contact.id}.png?size=200x200`;
  const tags = contact.tags;
  return (
    <div id="contact">
      <p>KUKU</p>
      {contact ? (
        <div>
          <img
            key={contact.avatar_url}
            src={
              contact.avatar_url ||
              `https://robohash.org/${contact.id}.png?size=200x200`
            }
          />
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
      ) : (
        <p> No data</p>
      )}
    </div>
  );
}

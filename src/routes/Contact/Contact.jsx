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
  console.log("contact", contact.length);
  console.log("result", result);
  return (
    <div id="contact">
      <p>KUKU</p>
      {contact.length > 0 ? (
        <div>
          <img
            key={contact.avatar_url}
            src={
              contact.avatar_url ||
              `https://robohash.org/${contact.id}.png?size=200x200`
            }
          />
        </div>
      ) : (
        <p> No data</p>
      )}
    </div>
  );
}

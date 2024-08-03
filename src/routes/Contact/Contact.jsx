import { useLoaderData } from "react-router-dom";
import { addTags, getContactById } from "../../services/requests";
import { useFetcher } from "react-router-dom";

export async function loader({ params }) {
  // console.log("params", params);
  const result = await getContactById(params.contactId);
  return { result };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const tag = formData.get("tag");
  const tagsArr = { tags: [tag] };
  console.log("tag in formData", tagsArr);
  return addTags(params.contactId, tagsArr);
}

export default function Contact() {
  const fetcher = useFetcher();
  const { result } = useLoaderData();
  const contact = result?.length > 0 ? result[0] : [];
  const contactTags = contact.tags;

  console.log("contactTags", contactTags);
  //console.log("contact", contact);
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
          <fetcher.Form method="put">
            <input
              placeholder="Add new Tag"
              aria-label="Add new Tag"
              type="text"
              name="tag"
              // defaultValue={contact?.first}
            />

            <button type="submit">Add Tag</button>
          </fetcher.Form>
        </div>
      ) : (
        <p> No data</p>
      )}
    </div>
  );
}

import { useLoaderData } from "react-router-dom";
import { addTags, getContactById } from "../../services/requests";

import { useState } from "react";

export async function loader({ params }) {
  const result = await getContactById(params.contactId);
  return { result };
}

// export async function action({ request, params }) {
//   const formData = await request.formData();
//   const tag = formData.get("tag");
//   const tagsArr = { tags: [tag] };
//   console.log("tag in formData", tagsArr);
//   return addTags(params.contactId, tagsArr);
// }

export default function Contact() {
  const { result } = useLoaderData();
  const contact = result?.length > 0 ? result[0] : [];

  const [newTags, setNewTags] = useState("");
  const [tags, setTags] = useState(
    contact.tags?.map((tagObj) => tagObj.tag) || []
  );

  const lastName = contact.fields?.["last name"]?.[0]?.value || "";

  const firstName = contact.fields?.["first name"]?.[0]?.value || "";

  const email = contact.fields?.email?.[0]?.value || "";

  const avatar =
    contact.avatar_url || `https://robohash.org/${contact.id}.png?size=200x200`;

  const handleAddTag = async (event) => {
    event.preventDefault();

    const newTagsArray = newTags
      .split(/[^a-zA-Z0-9]+/)
      .filter((tag) => tag.trim() !== "");

    const updatedTags = [...tags, ...newTagsArray];
    setTags(updatedTags);

    const tagsArr = { tags: updatedTags };
    await addTags(contact.id, tagsArr);
    setNewTags("");
  };

  return (
    <div id="contact">
      {contact ? (
        <div>
          <img src={avatar} alt={`${firstName} ${lastName}`} />
          <p>{firstName}</p>
          <p>{lastName}</p>
          <p>{email}</p>
          <div>
            <h3>Tags</h3>
            {tags.map((tag, index) => (
              <span key={index + tag}>{tag}</span>
            ))}
          </div>
          <form method="post" onSubmit={handleAddTag}>
            <input
              placeholder="Add new Tag"
              aria-label="Add new Tag"
              type="text"
              name="tag"
              value={newTags}
              onChange={(e) => setNewTags(e.target.value)}
            />

            <button type="submit">Add Tag</button>
          </form>
        </div>
      ) : (
        <p> No data</p>
      )}
    </div>
  );
}

import { useLoaderData } from "react-router-dom";
import { addTags, getContactById } from "../../services/requests";

import { useState } from "react";
import SingleContactCard from "../../components/SingleContactCard/SingleContactCard";
import { OutlinedInput } from "@mui/material";
import styles from "./Contact.module.css";

import ButtonComponent from "../../components/Shared/ButtonComponent";
import GoBack from "../../components/Shared/GoBack/GoBack";

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
  console.log("tags in page", tags);
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
    <div className="pageWrapper">
      <div className="section">
        <div style={{ marginBottom: "2rem" }}>
          <GoBack state="/" />
        </div>

        {contact ? (
          <div className={`container ${styles.contactContainer}`}>
            <SingleContactCard contact={contact} tags={tags} />
            <form
              method="post"
              onSubmit={handleAddTag}
              className={styles.addTagsForm}
            >
              {/* <input
                placeholder="Add new Tag"
                aria-label="Add new Tag"
                type="text"
                name="tag"
                value={newTags}
                onChange={(e) => setNewTags(e.target.value)}
              /> */}
              <OutlinedInput
                placeholder="Add new Tag"
                aria-label="Add new Tag"
                type="text"
                name="tag"
                fullWidth={true}
                size="small"
                onChange={(e) => setNewTags(e.target.value)}
              />
              {/* <button type="submit">Add Tag</button> */}
              <ButtonComponent text="Add Tag" width="100%" />
            </form>
          </div>
        ) : (
          <p> No data</p>
        )}
      </div>
    </div>
  );
}

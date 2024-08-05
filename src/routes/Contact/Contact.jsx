import { useLoaderData, useNavigation } from "react-router-dom";
import { addTags } from "../../services/requests";

import { useState } from "react";
import SingleContactCard from "../../components/SingleContactCard/SingleContactCard";
import { OutlinedInput } from "@mui/material";
import styles from "./Contact.module.css";

import ButtonComponent from "../../components/Shared/ButtonComponent";
import GoBack from "../../components/Shared/GoBack/GoBack";

import CircularProgress from "@mui/material/CircularProgress";

export default function Contact() {
  const navigation = useNavigation();

  const { result } = useLoaderData();
  const contact = result?.length > 0 ? result[0] : [];

  const [newTags, setNewTags] = useState("");
  const [tags, setTags] = useState(
    contact.tags?.map((tagObj) => tagObj.tag) || []
  );

  const handleAddTag = async (event) => {
    event.preventDefault();

    const newTagsArray = newTags
      .split(/[^a-zA-Z0-9]+/)
      .filter((tag) => tag.trim() !== "");

    // const updatedTags = [...tags, ...newTagsArray];
    const updatedTags = Array.from(new Set([...tags, ...newTagsArray]));
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
        {navigation.state === "loading" ? (
          <div>
            <CircularProgress />
          </div>
        ) : null}
        {contact ? (
          <div className={`container ${styles.contactContainer}`}>
            <SingleContactCard contact={contact} tags={tags} />
            <form
              method="post"
              onSubmit={handleAddTag}
              className={styles.addTagsForm}
            >
              <OutlinedInput
                placeholder="Add new Tag"
                aria-label="Add new Tag"
                type="text"
                name="tag"
                fullWidth={true}
                size="small"
                onChange={(e) => setNewTags(e.target.value)}
                value={newTags}
              />

              <ButtonComponent text="Add Tag" width="100%" type="submit" />
            </form>
          </div>
        ) : (
          <p> No data</p>
        )}
      </div>
    </div>
  );
}

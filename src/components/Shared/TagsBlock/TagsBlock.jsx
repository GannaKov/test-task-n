/* eslint-disable react/prop-types */
import styles from "./TagsBlock.module.css";

const TagsBlock = ({ tags }) => {
  return (
    <div className={styles.tagsWrp}>
      {tags.map((tag, ind) => (
        <div className={styles.tagsItem} key={tag + ind}>
          {tag}
        </div>
      ))}
    </div>
  );
};

export default TagsBlock;

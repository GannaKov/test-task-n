/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./GoBack.module.css";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import ButtonComponent from "../ButtonComponent";

const GoBack = ({ state }) => {
  return (
    <Link className={styles.goBackLink} to={state}>
      <ButtonComponent width="150px" text="Go Back">
        <KeyboardArrowLeft />
      </ButtonComponent>
    </Link>
  );
};

export default GoBack;

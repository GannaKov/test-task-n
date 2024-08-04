/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

import ButtonComponent from "../ButtonComponent";

const GoBack = ({ state }) => {
  return (
    <Link to={state}>
      <ButtonComponent width="150px" text="Go Back" type="buttom">
        <KeyboardArrowLeft />
      </ButtonComponent>
    </Link>
  );
};

export default GoBack;

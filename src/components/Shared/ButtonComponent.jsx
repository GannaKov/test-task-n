/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

const ButtonComponent = ({ text, width, children, type }) => {
  return (
    <Button
      type={type}
      variant="outlined"
      sx={{
        color: "rgba(0, 0, 0, 0.6)",
        borderColor: "rgba(0, 0, 0, 0.6)",
        width: { width },
      }}
    >
      {children}
      {text}
    </Button>
  );
};

export default ButtonComponent;

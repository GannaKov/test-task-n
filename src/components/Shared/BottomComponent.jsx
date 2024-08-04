/* eslint-disable react/prop-types */
import { Button } from "@mui/material";

const BottomComponent = ({ text }) => {
  return (
    <Button
      type="submit"
      // color="primary"

      variant="outlined"
      sx={{
        color: "rgba(0, 0, 0, 0.6)",
        borderColor: "rgba(0, 0, 0, 0.6)",
        width: "100%",
      }}
    >
      {text}
    </Button>
  );
};

export default BottomComponent;

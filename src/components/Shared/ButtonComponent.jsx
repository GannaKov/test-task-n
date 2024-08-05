/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2b2929",
      contrastText: "#000",
    },
    secondary: {
      main: "#f50057",
      contrastText: "#fff",
    },
    
  },
});

const ButtonComponent = ({ text, width, children, type }) => {
  return (
    <ThemeProvider theme={theme}>
      <Button
        type={type}
        color="primary"
        variant="outlined"
        sx={{
          borderColor: "#00000099",
          width: { width },
        }}
      >
        {children}
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default ButtonComponent;

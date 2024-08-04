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
    white: {
      main: "#f0f8ff",
      light: "#FFFFFF",
      dark: "#FFFFFF",
      contrastText: "#000000",
    },
    black: {
      main: "#0000000",
      light: "#FFFFFF",
      dark: "#000000",
      contrastText: "#FFFFFF",
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
          // color: "rgba(0, 0, 0, 0.6)",

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

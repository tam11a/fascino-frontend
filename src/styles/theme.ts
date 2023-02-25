import { createTheme } from "@mui/material";

localStorage.setItem("theme", "dark");

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#1F2326",
      paper: "#161A1E",
    },
    primary: {
      main: "#F58EB3",
    },
    secondary: {
      main: "#5F6C74",
    },
  },
  typography: {
    fontFamily: "Sarala, sans-serif",
    button: {
      textTransform: "unset",
    },
  },
});

export default theme;

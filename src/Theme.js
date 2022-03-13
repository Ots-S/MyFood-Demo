import { createTheme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";

export default createTheme({
  palette: {
    primary: {
      main: green[800],
      contrastText: "white",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "white",
    },
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: "1rem",
        color: green[800],
        backgroundColor: green,
        textPrimary: "white",
      },
    },
    MuiInputLabel: {
      root: {
        fontSize: ".9rem",
      },
    },
  },
});

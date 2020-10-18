import { blueGrey } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

export const DarkTheme = createMuiTheme({
  palette: {
    type: "dark",
    background:{
      default:"#121212",
      paper:blueGrey[900]
    }
  },
});

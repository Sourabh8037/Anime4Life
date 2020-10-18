import React from "react";
import "./App.css";
import ResponsiveDrawer from "./components/ResponsiveDrawer";
import { ThemeProvider } from "@material-ui/core/styles";
import { DarkTheme } from "./assets/theme";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={DarkTheme}>
        <BrowserRouter>
          <ResponsiveDrawer></ResponsiveDrawer>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;

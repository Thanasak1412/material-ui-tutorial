import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { blue, pink } from "@material-ui/core/colors";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Create from "./pages/Create";
import Notes from "./pages/Notes";
import Layout from "./components/Layout";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: pink["A200"],
    },
  },
  typography: {
    fontFamily: "Quicksand",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Layout>
          <Switch>
            <Route path="/" exact>
              <Notes />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App;

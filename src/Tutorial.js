import React, { useState } from "react";

import {
  FormControlLabel,
  Checkbox,
  Button,
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { makeStyles } from "@material-ui/core/styles";
import "fontsource-roboto";
import { blue, yellow } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B, #FF8E53)",
    border: "none",
    padding: "5px 20px",
    marginBottom: "10px",
    borderRadius: "13px",
    color: "#fff",
  },
  titleButton: {
    color: "#000",
    textTransform: "lowercase",
  },
});

const ButtonStyles = () => {
  const classes = useStyles();
  return <Button className={classes.root}>TEST STYLED BUTTON</Button>;
};

const CheckboxEx = () => {
  const [checked, setChecked] = useState(false);

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
          inputProps={{
            "aria-label": "secondary checkbox",
          }}
        />
      }
      label="Checkbox"
    />
  );
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: yellow[400],
    }
  }
})

const Tutorial = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <AppBar>
          <Toolbar>
            <IconButton>
              <MenuIcon />
            </IconButton>
            <Typography variant="body1">
              MUI Theming
            </Typography>
            <Button style={{ paddingTop: 10 }}>LOGIN</Button>
          </Toolbar>
        </AppBar>
        <Grid container spacing={2} justify="center">
          <Grid item xs={3} sm={6}>
            <Paper style={{ height: 75, width: "100%" }} />
          </Grid>
          <Grid item xs={3} sm={6}>
            <Paper style={{ height: 75, width: "100%" }} />
          </Grid>
          <Grid item xs={3} sm={6}>
            <Paper style={{ height: 75, width: "100%" }} />
          </Grid>
        </Grid>
        <CheckboxEx />
        <ButtonStyles />
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<AcUnitIcon />}
          endIcon={<ArrowForwardIosIcon />}
        >
          Submit
        </Button>
      </Container>
    </ThemeProvider>
  );
};

export default Tutorial;

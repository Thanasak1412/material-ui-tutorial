import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { format } from "date-fns";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#F9F9F9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#F4F4F4",
    },
    typography: {
      textAlign: "center",
      fontSize: 28,
      padding: theme.spacing(2),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      background: "#FFFFFF",
      color: "#000"
    },
    toolBar: theme.mixins.toolbar,
  };
});

const Layout = ({ children }) => {
  const {
    page,
    drawer,
    drawerPaper,
    root,
    active,
    typography,
    appBar,
    toolBar,
  } = useStyles();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    {
      title: "My Note",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      title: "Create Note",
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: "/create",
    },
  ];

  return (
    <div className={root}>
      {/* app bar */}
      <AppBar className={appBar} elevation={0}>
        <Toolbar>
          <Typography>
            {format(new Date(), "'Today is a' do MMMM y")}
          </Typography>
        </Toolbar>
      </AppBar>

      {/* side bar */}

      <Drawer
        className={drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: drawerPaper }}
      >
        <Typography className={typography}>Test Notes</Typography>
        <List>
          {menuItems.map(({ title, icon, path }) => (
            <ListItem
              key={title}
              button
              onClick={() => {
                history.push(path);
              }}
              className={location.pathname === path ? active : null}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={page}>
        <div className={toolBar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;

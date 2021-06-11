import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
  makeStyles,
} from "@material-ui/core";

import { DeleteOutlined } from "@material-ui/icons";
import { yellow, blue, green, pink } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: ({category}) => {
      if (category === "work") {
        return yellow[700];
      }
      if (category === "todo") {
        return pink[500];
      }
      if (category === "reminders") {
        return blue[500];
      }
      if (category === "money") {
        return green[500];
      }
    },
  },
});

const NoteCard = ({ id, title, details, category, onDelete }) => {
  const classes = useStyles({category});

  return (
    <Card elevation={3}>
      <CardHeader
        avatar={
          <Avatar className={classes.avatar}>
            {category[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            onClick={() => {
              onDelete(id);
            }}
          >
            <DeleteOutlined />
          </IconButton>
        }
        title={title}
        subheader={category}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          {details}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard;

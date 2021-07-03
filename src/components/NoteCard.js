import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Typography,
  Avatar,
  makeStyles,
  CardActionArea,
  Modal,
  Backdrop,
  Zoom,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Button,
  Fade,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";

import { DeleteOutlined } from "@material-ui/icons";
import { yellow, blue, pink, red } from "@material-ui/core/colors";

const useStyles = makeStyles({
  avatar: {
    backgroundColor: ({ category }) => {
      if (category === "Money") {
        return yellow[700];
      }
      if (category === "Todo") {
        return pink[500];
      }
      if (category === "Work") {
        return blue[500];
      }
      if (category === "Reminders") {
        return red[500];
      }
    },
  },
  modal: {
    width: "50%",
    marginTop: 20,
    margin: "auto",
  },
  paper: {
    padding: 16,
    margin: 12,
  },
  dialogContent: {
    backgroundColor: "#E8E8E8",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
    borderRadius: 3,
  },
  field: {
    marginTop: 5,
    marginBottom: 5,
    caretColor: "#1769AA",
    display: "block",
  },
  button: {
    margin: "auto",
    marginTop: 5,
    display: "flex",
  },
});

const NoteCard = ({ id, title, details, category, onDelete, onUpdate }) => {
  const classes = useStyles({ category });
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [updateTitle, setUpdateTitle] = useState(title);
  const [updateDetails, setUpdateDetails] = useState(details);
  const [updateCategory, setUpdateCategory] = useState(category);

  const onClickOpen = () => {
    setOpen(true);
  };

  const onClickClose = () => {
    setOpen(false);
  };

  const onOpenDelete = () => {
    setOpenDelete(true);
  };

  const onCloseDelete = () => {
    setOpenDelete(false);
  };

  const onUpdateSubmit = (e) => {
    e.preventDefault();

    onUpdate(id, updateTitle, updateDetails, updateCategory);
  };

  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>
              {category[0].toUpperCase()}
            </Avatar>
          }
          action={
            <IconButton onClick={onOpenDelete}>
              <DeleteOutlined />
            </IconButton>
          }
          title={title}
          subheader={category}
        />
        <CardActionArea onClick={onClickOpen}>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {details}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Confirm Delete */}
      <Dialog
        open={openDelete}
        onClose={onCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Fade}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          <DialogContentText id="alert-dialog-description">
            {details}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDelete} color="secondary" variant="contained">
            Close
          </Button>
          <Button
            onClick={() => {
              onDelete(id);
            }}
            color="primary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Update Note */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={onClickClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Zoom in={open}>
          <Paper elevation={1} variant="outlined" className={classes.paper}>
            <form noValidate autoComplete="off" onSubmit={onUpdateSubmit}>
              <TextField
                className={classes.field}
                variant="outlined"
                label="Title"
                required
                fullWidth
                value={updateTitle}
                onChange={(e) => {
                  setUpdateTitle(e.target.value);
                }}
              />
              <TextField
                className={classes.field}
                variant="outlined"
                label="Details"
                multiline
                rows="10"
                required
                fullWidth
                value={updateDetails}
                onChange={(e) => setUpdateDetails(e.target.value)}
              />
              <FormControl className={classes.field}>
                <FormLabel>Note Category</FormLabel>
                <RadioGroup
                  value={updateCategory}
                  onChange={(e) => setUpdateCategory(e.target.value)}
                >
                  <FormControlLabel
                    value="Money"
                    label="Money"
                    control={<Radio color="primary" required={true} />}
                  />
                  <FormControlLabel
                    value="Todo"
                    label="Todo"
                    control={<Radio color="primary" required={true} />}
                  />
                  <FormControlLabel
                    value="Reminders"
                    label="Reminders"
                    control={<Radio color="primary" required={true} />}
                  />
                  <FormControlLabel
                    value="Work"
                    label="Work"
                    control={<Radio color="primary" required={true} />}
                  />
                </RadioGroup>
              </FormControl>
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={onClickClose}
              >
                Update
              </Button>
            </form>
          </Paper>
        </Zoom>
      </Modal>
    </div>
  );
};

export default NoteCard;

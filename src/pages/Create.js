import React, { useState } from "react";
import {
  Typography,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  FormControl,
  Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { KeyboardArrowRight } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyle = makeStyles({
  root: {
    fontWeight: "600",
  },
  button: {
    marginTop: 5,
  },
  field: {
    marginTop: 5,
    marginBottom: 5,
    caretColor: "#1769AA",
    display: "block",
  },
});

const Create = () => {
  const classes = useStyle();
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [titleErr, setTitleErr] = useState(false);
  const [detailsErr, setDetailsErr] = useState(false);
  const [category, setCategory] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    setTitleErr(false);
    setDetailsErr(false);

    if (title === "") {
      setTitleErr(true);
    }
    if (details === "") {
      setDetailsErr(true);
    }
    if (title && details && category) {
      fetch("http://localhost:8000/notes", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ title, details, category }),
      }).then(() => history.push("/"));
    }
  };

  return (
    <Container size="sm">
      <Typography className={classes.root} color="textSecondary">
        Create a New Note
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          onChange={(e) => {
            const { value } = e.target;
            setTitle(value);
          }}
          name="title"
          className={classes.field}
          variant="outlined"
          label="Title"
          required
          fullWidth
          error={titleErr}
        />
        <TextField
          onChange={(e) => {
            const { value } = e.target;
            setDetails(value);
          }}
          name="details"
          className={classes.field}
          variant="outlined"
          label="Details"
          multiline
          rows="5"
          required
          fullWidth
          error={detailsErr}
        />
        <FormControl className={classes.field}>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
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
          endIcon={<KeyboardArrowRight />}
          variant="contained"
          color="primary"
        >
          submit
        </Button>
      </form>
    </Container>
  );
};

export default Create;

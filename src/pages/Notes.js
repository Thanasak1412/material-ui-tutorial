import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

import NoteCard from "../components/NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, []);

  const onDelete = async (id) => {
    fetch(`http://localhost:8000/notes/${id}`, {
      method: "DELETE",
    });

    const newNotes = await notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const breakpoint = {
    default: 3,
    1100: 3,
    700: 2,
  };

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoint}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {notes.map(({ id, title, details, category }) => {
          return (
            <div key={id}>
              <NoteCard
                id={id}
                title={title}
                details={details}
                category={category}
                onDelete={onDelete}
              />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
};

export default Notes;

import { Container } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";

import NoteCard from "../components/NoteCard";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const HOST_API = "http://localhost:8000/notes/";

  useEffect(() => {
    fetch(HOST_API)
      .then((res) => res.json())
      .then((data) => setNotes(data));
  }, [notes]);

  const onDelete = async (id) => {
    fetch(`${HOST_API}${id}`, {
      method: "DELETE",
    });

    const newNotes = await notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const onUpdate = (id, title, details, category) => {
    fetch(`${HOST_API}${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        details,
        category,
        completed: true,
      }),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };

  const breakpoint = {
    default: 3,
    1100: 2,
    700: 1,
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
                onUpdate={onUpdate}
              />
            </div>
          );
        })}
      </Masonry>
    </Container>
  );
};

export default Notes;

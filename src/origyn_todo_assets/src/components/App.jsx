import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { origyn_todo } from "../../../declarations/origyn_todo";

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      origyn_todo.createNote(newNote.title, newNote.content)
      return [ newNote, ...prevNotes ];
    });
  }

  useEffect(() => {
   fetchData()
  }, [])
  
  async function fetchData() {
   const notesArray = await origyn_todo.readNotes();
   setNotes(notesArray);
  }


  function deleteNote(id) {
    origyn_todo.removeNote(id);
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;

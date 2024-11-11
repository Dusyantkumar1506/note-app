import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";

const Home = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query, setQuery] = useState("");
  const [filterNotes, setFilterNotes] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilterNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  const fetchNotes = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setNotes(data.notes);
      console.log(data);
    } catch (error) {
      console.log(error);
      setNotes([]);
    }
  };

  const closeModel = () => {
    setIsOpenModel(false);
  };
  const onEdit = (note) => {
    setCurrentNote(note);
    setIsOpenModel(true);
  };

  const addNote = async ({ title, description }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note Added");
        fetchNotes();
        closeModel();
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
    }
  };

  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note Updated Successfully");
        fetchNotes();
        closeModel();
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note Deleted");
        fetchNotes();
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar setQuery={setQuery} />

      <div className="grid grid-cols-1 md:grid-cols-3 px-8 pt-5 gap-5">
        {filterNotes.length > 0 ? (
          filterNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              deleteNote={deleteNote}
            />
          ))
        ) : (
          <p>No Notes</p>
        )}
      </div>

      <button
        onClick={() => setIsOpenModel(true)}
        className="bg-teal-600 text-white font-bold p-4 rounded-full fixed text-2xl right-4 bottom-4"
      >
        +
      </button>
      {isOpenModel && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote}
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;

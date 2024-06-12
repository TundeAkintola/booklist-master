import axios from "axios";
import { useState, useEffect } from "react";
import BookList from "./components/BookList";
import BookCreate from "./components/BookCreate";

export default function App() {
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    const response = await axios.get("http://localhost:3001/books");
    setBooks(response.data);
  };
  // ✔FIRST RENDER & NEVER AGAIN
  useEffect(() => {
    fetchBooks();
  }, []);

  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    console.log(response);
    const updatedBooks = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };
  const createBook = async (title) => {
    const response = await axios.post("http://localhost:3001/books", {
      title,
    });

    console.log(response);

    const updatedBooks = [...books, response.data];
    setBooks(updatedBooks);
  };

  return (
    <>
      <div className="app">
        <h1>My Book List</h1>
        <BookList
          books={books}
          onEdit={editBookById}
          onDelete={deleteBookById}
        />
        <BookCreate onCreate={createBook} />
      </div>
    </>
  );
}

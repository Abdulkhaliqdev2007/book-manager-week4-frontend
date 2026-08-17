import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

import {
  fetchBooks as getBooksAPI,
  createBook,
  updateBook,
  deleteBook,
} from "../services/bookService";

const BookContext = createContext(null);

export const BookProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
const [sortOption, setSortOption] = useState("default");

  const [loading, setLoadingState] = useState({
    fetch: false,
    add: false,
    update: false,
    delete: false,
  });

  const [error, setErrorState] = useState({
    fetch: null,
    add: null,
    update: null,
    delete: null,
  });

  const [deletingId, setDeletingId] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");

  const setLoading = (type, value) => {
    setLoadingState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const setError = (type, value) => {
    setErrorState((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  // AUTO-HIDE SUCCESS MESSAGE
  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  // GET ALL BOOKS
  const fetchBooks = useCallback(async () => {
    setLoading("fetch", true);
    setError("fetch", null);

    try {
      const data = await getBooksAPI();

      console.log("BOOKS FROM API:", data);

      setBooks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch books error:", error);

      setError(
        "fetch",
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch books"
      );

      setBooks([]);
    } finally {
      setLoading("fetch", false);
    }
  }, []);

  // ADD BOOK
  const addBook = async (bookData) => {
    setLoading("add", true);
    setError("add", null);

    try {
      const newBook = await createBook(bookData);

      console.log("NEW BOOK:", newBook);

      setBooks((prev) => [...prev, newBook]);

      setSuccessMessage("Book added successfully!");
    } catch (error) {
      setError(
        "add",
        error.response?.data?.message ||
          error.message ||
          "Failed to add book"
      );

      throw error;
    } finally {
      setLoading("add", false);
    }
  };

  // UPDATE BOOK
  const editBook = async (id, bookData) => {
    setLoading("update", true);
    setError("update", null);

    try {
      const updatedBook = await updateBook(id, bookData);

      setBooks((prev) =>
        prev.map((book) =>
          book._id === id ? updatedBook : book
        )
      );

      setSuccessMessage("Book updated successfully!");
    } catch (error) {
      setError(
        "update",
        error.response?.data?.message ||
          error.message ||
          "Failed to update book"
      );

      throw error;
    } finally {
      setLoading("update", false);
    }
  };

  // DELETE BOOK
  const removeBook = async (id) => {
    setDeletingId(id);
    setLoading("delete", true);
    setError("delete", null);

    try {
      await deleteBook(id);

      setBooks((prev) =>
        prev.filter((book) => book._id !== id)
      );

      setSuccessMessage("Book deleted successfully!");
    } catch (error) {
      setError(
        "delete",
        error.response?.data?.message ||
          error.message ||
          "Failed to delete book"
      );

      throw error;
    } finally {
      setDeletingId(null);
      setLoading("delete", false);
    }
  };

  // FETCH BOOKS WHEN USER IS AUTHENTICATED
  useEffect(() => {
    if (isAuthenticated) {
      fetchBooks();
    }
  }, [isAuthenticated, fetchBooks]);

  return (
    <BookContext.Provider
     value={{
  books,
  loading,
  error,
  deletingId,
  successMessage,

  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption,

  fetchBooks,
  addBook,
  editBook,
  removeBook,
}}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => {
  const context = useContext(BookContext);

  if (!context) {
    throw new Error(
      "useBooks must be used inside BookProvider"
    );
  }

  return context;
};
/**
 * services/bookService.js
 */

import api from "./api";


// Fetch all books
export const fetchBooks = async () => {
  const response = await api.get("/books");

  console.log("GET BOOKS RESPONSE:", response.data);

  return response.data;
};


// Fetch single book
export const fetchBookById = async (id) => {
  const response = await api.get(`/books/${id}`);

  return response.data;
};


// Create book
export const createBook = async (bookData) => {

  const response = await api.post(
    '/books',
    bookData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};


// Update book
export const updateBook = async (id, bookData) => {

  const response = await api.put(
    `/books/${id}`,
    bookData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};


// Delete book
export const deleteBook = async (id) => {
  const response = await api.delete(`/books/${id}`);

  return response.data;
};
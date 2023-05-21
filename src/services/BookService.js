import { axios } from "./ApiService";

export const GET_ALL_BOOKS = async () => {
  try {
    const response = await axios.get("/books");
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const GET_BOOK_BY_ID = async (id) => {
  try {
    const response = await axios.get(`/books/${id}`);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const DELETE_BOOK = async (id) => {
  try {
    const response = await axios.delete(`/books/${id}`);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const SEARCH_BOOK = async (text) => {
  try {
    const response = await axios.get(`/books/search?query=${text}`);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const POST_NEW_BOOK = async (newBook) => {
  try {
    const response = await axios.post("/books/add-book", newBook);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

export const EDIT_BOOK = async (bookId, updatedBook) => {
  try {
    const response = await axios.put(`/books/${bookId}`, updatedBook);
    return { error: false, data: response.data };
  } catch (err) {
    console.error(err);
    return { error: true, data: err };
  }
};

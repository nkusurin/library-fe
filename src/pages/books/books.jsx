import Table from "../../components/table.jsx";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  DELETE_BOOK,
  GET_ALL_BOOKS,
  SEARCH_BOOK,
} from "../../services/BookService.js";
import { bookTableHeader } from "./bookTableHeader.jsx";
import Search from "../../components/search.jsx";
import NavigationBar from "../../components/navBar.jsx";

function Books() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const getBooks = useCallback(async () => {
    const response = await GET_ALL_BOOKS();
    console.log("books > ", response.data);
    if (response.error) {
      throw new Error("no books in databse");
    } else {
      setBooks(response.data);
    }
  }, []);

  useEffect(() => {
    getBooks();
  }, []);

  const handleEdit = (id) => {
    console.log("books-edit");
    navigate(`/edit-book/${id}`);
  };

  const handleDetails = (id) => {
    console.log("book-details for book with id: ", id);
    navigate(`/book-details/${id}`);
  };

  const handleDelete = useCallback(async (id) => {
    const response = await DELETE_BOOK(id);
    console.log("book deleted > ", response.data);
    if (response.error) {
      throw new Error("no books in databse");
    } else {
      window.location.reload(false);
    }
  }, []);

  const handleSearch = async (text) => {
    const response = await SEARCH_BOOK(text);
    console.log("book deleted > ", response.data);
    if (response.error) {
      throw new Error("no books in database");
    } else {
      setBooks(response.data);
    }
  };

  const handleAddBook = () => {
    console.log("Adding new book clicked");
    navigate("/new-book");
  };

    return (
    <div>
        <NavigationBar />
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <Search handleSearch={handleSearch} />
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 "
                    onClick={handleAddBook}
                >
                    Dodaj knjigu
                </button>
            </div>
            <Table
                data={books}
                tableElements={bookTableHeader}
                handleEdit={handleEdit}
                handleDetails={handleDetails}
                handleDelete={handleDelete}
                detailsButtonVisibility={true}
            />
        </div>
    </div>
  );
}

export default Books;

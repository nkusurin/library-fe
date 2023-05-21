import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GET_ALL_GENRES } from "../../services/GenreService";
import { GET_ALL_PUBLISHERS } from "../../services/PublisherService";
import { POST_NEW_BOOK, EDIT_BOOK } from "../../services/BookService";

function BookForm(props) {
  const navigate = useNavigate();
  const { book } = props;

  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [isbnError, setIsbnError] = useState(null);

  const [newBook, setNewBook] = useState({
    id: book.id,
    isbn: book.isbn,
    title: book.title,
    description: book.description,
    availability: book.availability,
    genreId: book.genre.id,
    publisherId: book.publisher.id,
  });

  const getAllExistingPublishers = useCallback(async () => {
    const response = await GET_ALL_PUBLISHERS();
    console.log("publishers > ", response.data);
    if (response.error) {
      throw new Error("No publishers in the database.");
    } else {
      setPublishers(response.data);
    }
  }, []);

  const getAllExistingGenres = useCallback(async () => {
    const response = await GET_ALL_GENRES();
    console.log("genres > ", response.data);
    if (response.error) {
      throw new Error("No genres in the database.");
    } else {
      setGenres(response.data);
    }
  }, []);

  useEffect(() => {
    getAllExistingPublishers();
    getAllExistingGenres();
  }, [getAllExistingPublishers, getAllExistingGenres]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "isbn") {
      validateISBN(value);
    }

    setNewBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const saveNewBook = async () => {
    console.log(newBook.availability);
    const response = await POST_NEW_BOOK(newBook);
    if (response.error) {
      throw new Error("error with creating a new publisher");
    } else {
      if (response.data != "") {
        console.log(response);
        console.log("Book spremljena uspjesno");
        navigate("/books");
      }
    }
  };

  const updateExistingBook = async () => {
    const response = await EDIT_BOOK(book.id, newBook);
    if (response.error) {
      throw new Error("error with updating an existing book");
    } else {
      console.log("Book updated uspjesno");
      navigate("/books");
    }
  };

  const validateISBN = (isbn) => {
    const isValidIsbn = /^[0-9]{13}$/.test(isbn);
    if (!isValidIsbn) {
      setIsbnError("Isbn mora imati 13 znakova, samo znamenke!");
      return; // Do not update the state if the ISBN is invalid
    } else {
      setIsbnError(null);
    }
  };

  const handleSubmit = () => {
    validateISBN(newBook.isbn);
    if (book.id) {
      updateExistingBook();
    } else {
      saveNewBook();
    }
  };

  return (
    <>
      <div className="bg-gray-200 rounded-md p-4 max-w-md mx-auto">
        <div className="mb-4 text-center">
          <label htmlFor="isbn" className="block text-gray-700 font-bold">
            ISBN:
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={newBook.isbn}
            onChange={handleChange}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          />
          {isbnError && <div className="text-red-500">{isbnError}</div>}
        </div>

        <div className="mb-4 text-center">
          <label htmlFor="title" className="block text-gray-700 font-bold">
            Naslov:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newBook.title}
            onChange={handleChange}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          />
        </div>

        <div className="mb-4 text-center">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold"
          >
            Opis:
          </label>
          <textarea
            id="description"
            name="description"
            value={newBook.description}
            onChange={handleChange}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          ></textarea>
        </div>

        <div className="mb-4 text-center">
          <label
            htmlFor="availability"
            className="block text-gray-700 font-bold"
          >
            Dostupnost:
          </label>
          <select
            id="availability"
            name="availability"
            value={newBook.availability}
            onChange={handleChange}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          >
            <option value="default" disabled>
              Odaberi dostupnost...
            </option>
            <option value="dostupno">dostupno</option>
            <option value="nedostupno">nedostupno</option>
          </select>
        </div>

        <div className="mb-4 text-center">
          <label htmlFor="genreId" className="block text-gray-700 font-bold">
            Žanr:
          </label>
          <select
            id="genreId"
            name="genreId"
            value={newBook.genreId}
            onChange={handleChange}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          >
            <option value="">Odaberi žanr...</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 text-center">
          <label
            htmlFor="publisherId"
            className="block text-gray-700 font-bold"
          >
            Nakladnik:
          </label>
          <select
            id="publisherId"
            name="publisherId"
            value={newBook.publisherId}
            onChange={handleChange}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          >
            <option value="">Odaberi nakladnika...</option>
            {publishers.map((publisher) => (
              <option key={publisher.id} value={publisher.id}>
                {publisher.name}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center">
          <button
            className="btn-primary rounded-full bg-gray-800 text-white px-4 py-2"
            onClick={handleSubmit}
            disabled={isbnError}
          >
            Spremi
          </button>
        </div>
      </div>
    </>
  );
}

export default BookForm;

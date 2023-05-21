import { useParams } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { GET_BOOK_BY_ID } from "../../services/BookService";
import BookForm from "./BookForm";

function EditBookPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  const getBookById = useCallback(async (id) => {
    const response = await GET_BOOK_BY_ID(id);
    console.log("book by id > ", response.data);
    if (response.error) {
      throw new Error("no book in databsae");
    } else {
      setBook(response.data);
    }
  }, []);

  useEffect(() => {
    getBookById(id);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2 text-center">
        Uredi knjigu
      </h1>
      {book && <BookForm book={book} />}
    </>
  );
}

export default EditBookPage;

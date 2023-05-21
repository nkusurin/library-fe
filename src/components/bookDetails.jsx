import { useEffect, useState, useCallback } from "react";
import { GET_BOOK_BY_ID } from "../services/BookService";
import { GET_LOANS_FOR_BOOK_BY_ID, DELETE_LOAN_FOR_BOOK_BY_ID } from "../services/LoanService";
import { useNavigate } from "react-router-dom";

function BookDetails(props) {
  const navigate = useNavigate();

  console.log("Props id: ", props.id);

  const { isEditDisabled } = props;
  const [book, setBook] = useState({
    id: "",
    isbn: "",
    title: "",
    description: "",
    availability: "",
    genre: "",
    publisher: "",
    loans: [],
  });

  const getBookById = useCallback(async (id) => {
    console.log("trazim knjigu s id-e:", id);
    const response = await GET_BOOK_BY_ID(id);
    if (response.error) {
      throw new Error("Book with this id doesn't exist in the database");
    } else {
      console.log("KNJIGA S BE > ", response.data);
      setBook(response.data);
    }
  }, []);

  useEffect(() => {
    getBookById(props.id);
  }, []);

  const handleSubmit = () => {
    console.log("Handle submit clicked");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleAddLoan = (id) => {
    console.log("dodavanje posudbe za knjigu sa idem: ", id);
    navigate(`/new-loan/${id}`);
  };

  const handleEditLoan = (loanId) => {
    console.log("Loan with id; ", loanId);
    navigate(`/edit-loan/${loanId}`);
  };
  
  const handleDeleteLoan = useCallback(async (id) => {
        const response = await DELETE_LOAN_FOR_BOOK_BY_ID(id);
        console.log("book deleted > ", response.data);
        if (response.error) {
            throw new Error("no books in databse");
        } else {
            window.location.reload(false);
        }
    }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Detalji o knjizi:</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            ID
          </label>
          <input
            type="text"
            id="id"
            className="form-input"
            placeholder="Enter ID..."
            value={book.id}
            onChange={handleChange}
            name="id"
            readOnly={isEditDisabled}
          />
        </div>
        <div>
          <label
            htmlFor="isbn"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            className="form-input"
            placeholder="Enter ISBN..."
            value={book.isbn}
            onChange={handleChange}
            name="isbn"
            readOnly={isEditDisabled}
          />
        </div>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Naslov
          </label>
          <input
            type="text"
            id="title"
            className="form-input"
            placeholder="Enter title..."
            value={book.title}
            onChange={handleChange}
            name="title"
            readOnly={isEditDisabled}
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Opis
          </label>
          <input
            type="text"
            id="description"
            className="form-input"
            placeholder="Enter description..."
            value={book.description}
            onChange={handleChange}
            name="description"
            readOnly={isEditDisabled}
          />
        </div>
        <div>
          <label
            htmlFor="availability"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Dostupnost
          </label>
          <input
            type="text"
            id="availability"
            className="form-input"
            placeholder="Enter availability..."
            value={book.availability}
            onChange={handleChange}
            name="availability"
            readOnly={isEditDisabled}
          />
        </div>
        <div>
          <label
            htmlFor="genre"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Žanr
          </label>
          <input
            type="text"
            id="genre"
            className="form-input"
            placeholder="Enter genre..."
            value={book.genre.name}
            onChange={handleChange}
            name="genre"
            readOnly={isEditDisabled}
          />
        </div>
        <div>
          <label
            htmlFor="publisher"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Nakladnik
          </label>
          <input
            type="text"
            id="publisher"
            className="form-input"
            placeholder="Enter publisher..."
            value={book.publisher.name}
            onChange={handleChange}
            name="publisher"
            readOnly={isEditDisabled}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold my-8">Povijest posudbi:</h2>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 "
        onClick={() => handleAddLoan(props.id)}
      >
        Dodaj posudbu
      </button>
      <div className="grid grid-cols-2 gap-4">
        {book.loans.map((loan, index) => (
          <div key={index} className="bg-gray-200 rounded-md p-4">
            <span onClick={() => handleEditLoan(loan.id)}>&#9998;</span>
            <span onClick={() => handleDeleteLoan(loan.id)}
                    style={{
                        cursor: 'default',
                        backgroundColor: 'rgb(237, 76, 76)',
                        margin: '10px',
                        padding: '3px'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = 'rgb(255, 97, 97)';
                        e.target.style.cursor = 'pointer';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = 'rgb(237, 76, 76)';
                        e.target.style.cursor = 'default';
                    }}>delete</span>
            <p className="font-medium">Posudba {index + 1}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-700">Type:</p>
                <p className="text-lg">{loan.type}</p>
              </div>
              <div>
                        <p className="text-sm font-medium text-gray-700">Posuđeno:</p>
                        <p className="text-lg">{new Date(loan.borrowed).toLocaleDateString("hr-HR")}</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700">Vraćeno:</p>
                    <p className="text-lg">{new Date(loan.returned).toLocaleDateString("hr-HR")}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BookDetails;

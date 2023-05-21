import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST_NEW_LOAN, EDIT_LOAN_BY_ID } from "../../services/LoanService";

function LoanForm(props) {
  const navigate = useNavigate();
  const { loan, bookId } = props;

  const [newLoan, setNewLoan] = useState({
    type: loan.type,
    borrowed: loan.borrowed,
    returned: loan.returned,
    bookId: bookId,
  });

  const handleChange = (e) => {
    console.log("Event > ", e.target.value);
    const { name, value } = e.target;
    setNewLoan((prevLoan) => ({
      ...prevLoan,
      [name]: value,
    }));
  };

  const saveNewLoan = async () => {
    const response = await POST_NEW_LOAN(newLoan);
    if (response.error) {
      throw new Error("error with creating a new loan");
    } else {
      console.log("Loan spremljena uspjesno");
      navigate(`/book-details/${bookId}`);
    }
  };

  const updateExistingLoan = async () => {
    const response = await EDIT_LOAN_BY_ID(loan.id, newLoan);
    if (response.error) {
      throw new Error("error with updating an existing loan");
    } else {
      navigate(`/book-details/${bookId}`);
    }
  };

  const handleSubmit = () => {
    if (loan.id) {
      updateExistingLoan();
    } else {
      saveNewLoan();
    }
  };

  return (
    <>
      <div className="bg-gray-200 rounded-md p-4 max-w-md mx-auto">
        <div className="mb-4 text-center">
          <label htmlFor="type" className="block text-gray-700 font-bold">
            Tip posudbe:
          </label>
          <select
            id="type"
            name="type"
            value={newLoan.type}
            onChange={(e) => handleChange(e)}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          >
            <option value="">Odaberi tip posudbe...</option>
            <option value="fizička">fizička</option>
            <option value="pdf">pdf</option>
          </select>
        </div>

        <div className="mb-4 text-center">
          <label htmlFor="borrowed" className="block text-gray-700 font-bold">
            Datum posudbe:
          </label>
          <input
            type="datetime-local"
            id="borrowed"
            name="borrowed"
            value={newLoan.borrowed}
            onChange={(e) => handleChange(e)}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          />
        </div>

        <div className="mb-4 text-center">
          <label htmlFor="returned" className="block text-gray-700 font-bold">
            Datum povratka:
          </label>
          <input
            type="datetime-local"
            id="returned"
            name="returned"
            value={newLoan.returned}
            onChange={(e) => handleChange(e)}
            className="border border-gray-400 rounded-md px-3 py-2 mt-1 w-full"
          />
        </div>

        <div className="text-center">
          <button
            className="btn-primary rounded-full bg-gray-800 text-white px-4 py-2"
            onClick={handleSubmit}
          >
            Spremi
          </button>
        </div>
      </div>
    </>
  );
}

export default LoanForm;

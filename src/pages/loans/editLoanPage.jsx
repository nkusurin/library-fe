import LoanForm from "./loanForm";
import { useParams } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import { GET_LOAN_BY_ID } from "../../services/LoanService";

function EditLoanPage() {
  const { loanId } = useParams();
  const [loan, setLoan] = useState(null);

  const getLoanById = useCallback(async (id) => {
    const response = await GET_LOAN_BY_ID(id);
    if (response.error) {
      throw new Error("no loan in databsae");
    } else {
      console.log("Fetched data = ", response.data);
      setLoan(response.data);
    }
  }, []);

  useEffect(() => {
    getLoanById(loanId);
  }, [getLoanById]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2 text-center">
        Uredi posudbu
      </h1>
      {loan && <LoanForm loan={loan} bookId={loan.bookId} />}
    </>
  );
}

export default EditLoanPage;

import LoanForm from "./loanForm";
import { useParams } from "react-router-dom";

function NewLoanPage() {
  const { id } = useParams();

  let loan = {
    type: "",
    borroed: "",
    returned: "",
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2 text-center">
        Nova posudba
      </h1>
      <LoanForm loan={loan} bookId={id} />
    </>
  );
}

export default NewLoanPage;

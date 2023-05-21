import BookDetails from "../../components/bookDetails";
import { useParams } from "react-router-dom";

function BookDetailsPage() {
  const { id } = useParams();

  const isEditDisabled = true;
  return (
    <>
      <BookDetails id={id} isEditDisabled={isEditDisabled} />
    </>
  );
}

export default BookDetailsPage;

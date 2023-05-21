import BookDetails from "../../components/bookDetails";
import NavigationBar from "../../components/navBar.jsx";
import { useParams } from "react-router-dom";

function BookDetailsPage() {
  const { id } = useParams();

  const isEditDisabled = true;
  return (
    <>
      <NavigationBar/>
      <BookDetails id={id} isEditDisabled={isEditDisabled} />
    </>
  );
}

export default BookDetailsPage;

import PublisherForm from "./publisherForm";
import { useParams } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";
import { GET_PUBLISHER_BY_ID } from "../../services/PublisherService";

function EditPublisherPage() {
  const { id } = useParams();
  const [publisher, setPublisher] = useState(null);

  const getPublisherbyId = useCallback(async (id) => {
    const response = await GET_PUBLISHER_BY_ID(id);
    console.log("publisher by id > ", response.data);
    if (response.error) {
      throw new Error("no publisher in databsae");
    } else {
      setPublisher(response.data);
    }
  }, []);

  useEffect(() => {
    getPublisherbyId(id);
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2 text-center">
        Uredi nakladnika
      </h1>
      {publisher && (
        <PublisherForm publisher={publisher} isEditDisabled={false} />
      )}
    </>
  );
}

export default EditPublisherPage;

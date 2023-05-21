import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  EDIT_PUBLISHER,
  POST_NEW_PUBLISHER,
} from "../../services/PublisherService";

function PublisherForm(props) {
  const navigate = useNavigate();
  const { publisher, isEditDisabled } = props;

  const [currentPublisher, setCurrentPublisher] = useState({
    id: publisher.id,
    name: publisher.name,
    address: publisher.address,
    phone: publisher.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentPublisher((prevPublisher) => ({
      ...prevPublisher,
      [name]: value,
    }));
  };

  const saveNewPublisher = async (newPublisher) => {
    const response = await POST_NEW_PUBLISHER(newPublisher);
    if (response.error) {
      throw new Error("error with creating a new publisher");
    } else {
      console.log("Publisher spremljen uspjesno");
      navigate("/publishers");
    }
  };

  const updateExistingPublisher = async (id, updatedPublisher) => {
    const response = await EDIT_PUBLISHER(id, updatedPublisher);
    if (response.error) {
      throw new Error("error with updating an existing publisher");
    } else {
      console.log("Publisher updated uspjesno");
      navigate("/publishers");
    }
  };

  const handleSubmit = () => {
    if (publisher.id) {
      console.log("Update, u editiranju sam: ", currentPublisher);
      updateExistingPublisher(publisher.id, currentPublisher);
    } else {
      saveNewPublisher(currentPublisher);
      setCurrentPublisher({ name: "", address: "", phone: "" });
    }
  };

  return (
    <>
      <div className="bg-gray-200 rounded-md p-4 max-w-md mx-auto">
        <div className="mb-4 text-center">
          <label
            htmlFor="name"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Naziv
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            placeholder="Unesi naziv..."
            value={currentPublisher.name}
            onChange={handleChange}
            name="name"
            readOnly={isEditDisabled}
          />
        </div>

        <div className="mb-4 text-center">
          <label
            htmlFor="address"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Adresa
          </label>
          <input
            type="text"
            id="address"
            className="form-input"
            placeholder="Unesi adresu..."
            value={currentPublisher.address}
            onChange={handleChange}
            name="address"
            readOnly={isEditDisabled}
          />
        </div>

        <div className="mb-4 text-center">
          <label
            htmlFor="phone"
            className="block text-sm font-medium bg-gray-200 text-gray-900 rounded-md px-2 py-1 mb-2"
          >
            Kontakt
          </label>
          <input
            type="text"
            id="phone"
            className="form-input"
            placeholder="Unesi kontakt..."
            value={currentPublisher.phone}
            onChange={handleChange}
            name="phone"
            readOnly={isEditDisabled}
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

export default PublisherForm;

import Table from "../../components/table.jsx";
import { useEffect, useState, useCallback } from "react";
import { publisherTableHeader } from "./publisherTableHeader.js";
import {DELETE_PUBLISHER, GET_ALL_PUBLISHERS, SEARCH_PUBLISHER} from "../../services/PublisherService";
import Search from "../../components/search.jsx";
import NavigationBar from "../../components/navBar.jsx";
import { useNavigate } from "react-router-dom";
import {DELETE_BOOK, SEARCH_BOOK} from "../../services/BookService";

function Publishers() {
  const navigate = useNavigate();
  const [publishers, setPublishers] = useState([]);

  const getPublishers = useCallback(async () => {
    const response = await GET_ALL_PUBLISHERS();
    if (response.error) {
      throw new Error("no publishers in databse");
    } else {
      setPublishers(response.data);
    }
  }, []);

  const handleAddPublisher = () => {
    navigate("/new-publisher");
  };

  const handleEdit = (id) => {
    navigate(`/edit-publisher/${id}`);
  };

  const handleDelete = useCallback(async (id) => {
    const response = await DELETE_PUBLISHER(id);
    console.log("publisher deleted > ", response.data);
    if (response.error) {
      throw new Error("no publisher in database");
    } else {
      window.location.reload(false);
    }
  }, []);

  const handleSearch = (async (text) => {
    const response = await SEARCH_PUBLISHER(text);
    console.log("book deleted > ", response.data);
    if (response.error) {
      throw new Error("no books in database");
    } else {
      setPublishers(response.data);
    }
  });

  useEffect(() => {
    console.log("Pozivanjee....");
    getPublishers();
  }, [getPublishers]);
    return (
    <div>
        <NavigationBar/>
        <div className="container mx-auto p-4">
            <div className="flex items-center justify-between mb-4">
                <Search handleSearch={handleSearch} />
                <button
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 "
                    onClick={handleAddPublisher}
                >
                    Dodaj nakladnika
                </button>
            </div>

            <Table
                data={publishers}
                tableElements={publisherTableHeader}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                detailsButtonVisibility={false}
            />
        </div>
    </div>
    
  );
}

export default Publishers;

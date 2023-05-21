import React, { useState } from "react";

function Search(props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { handleSearch } = props;

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Unesi upit za pretragu..."
        className=" px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
  );
}

export default Search;

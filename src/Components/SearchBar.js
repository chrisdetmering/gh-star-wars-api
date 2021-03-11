import React, { useState } from "react";


const SearchBar = ({ search }) => {
  const [query, setQuery] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    search(`https://swapi.dev/api/people/?search=${query}`);
  };

  return (
    <form className="input-group m-4" onSubmit={handleSubmit}>
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search Characters"
        required
        aria-label="Search"
        aria-describedby="search-addon"
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="btn btn-outline-primary ml-2">
        Search
      </button>
    </form>
  );
};

export default SearchBar;

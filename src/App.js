import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import CharacterTable from "./Components/CharacterTable";
import ReactPaginate from "react-paginate";
import { BeatLoader } from "react-spinners";

import SearchBar from "./Components/SearchBar";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { 
    getCharacters("https://swapi.dev/api/people/"); 
  }, [])

  const getCharacters = async (url) => { 
      setLoading(true); 
      const response = await axios.get(url); 
      let characters = response.data.results; 

      characters = await Promise.all(characters.map(async character => { 
        character.species =  await getSpecies(character.species); 
        character.homeWorld = await getHomeWorld(character.homeworld); 
        return character; 
      }))

      setCharacters(characters); 
      setLoading(false); 
  }

  const getHomeWorld = async (url) => { 
    const response = await axios.get(url); 
    return response.data.name; 
  }


  const getSpecies = async (url) => { 
    if (url.length === 0) { 
      return "Human"; 
    }
    const response = await axios.get(url[0]); 
    return response.data.name; 
  }

  const handlePageChange = (pageNumber) => { 
      getCharacters(`http://swapi.dev/api/people/?page=${pageNumber}`)
  } 


  return (
    <div className="p-5 text-center bg-light">
      <h1 className="mb-3">Star Wars</h1>
      <SearchBar search={getCharacters} />

      {!loading ? <CharacterTable
          characters={characters}/>
       : <BeatLoader />}

      <ReactPaginate
        pageCount="9"
        onPageChange={({ selected }) => {
          handlePageChange(selected + 1)
        }}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        activeClassName={"paginationActive"}
      />
    </div>
  );
};

export default App;

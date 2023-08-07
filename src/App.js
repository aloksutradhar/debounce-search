import { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";
import "./styles.css";
import { BsSearch } from "react-icons/bs";

export default function App() {
  const [seacrhInput, setSearchInput] = useState("");
  const [result, setResults] = useState([]);

  const debounceSearchTerm = useDebounce(seacrhInput, 500);

  useEffect(() => {
    if (debounceSearchTerm) {
      console.log("I have been called");
      fetchApi(debounceSearchTerm);
    } else {
      console.log("something else");
    }
  }, [debounceSearchTerm]);

  const fetchApi = (searchValue) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`)
      .then((res) => res.json())
      .then((response) => setResults(response));
  };

  return (
    <div className="App">
      <h5>Search the details</h5>
      <div className="searchBox">
        <BsSearch className="searchIcon" />
        <input
          type="text"
          placeholder="search here..."
          value={seacrhInput}
          className="seacrhInput"
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      {result ? (
        <h5>
          {result.name}
          {result.order}
        </h5>
      ) : (
        <h5>No data</h5>
      )}
    </div>
  );
}

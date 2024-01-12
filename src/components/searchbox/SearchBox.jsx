import React, { useState, useEffect, useMemo } from "react";
import fetchRepositories from "../../services/FetchRepository";
import "./SearchBox.css";
import { useDebounce } from 'use-debounce';

const SearchBox = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState("");
  const [repositories, setRepositories] = useState([]);
  const debounceTime = 150;

  const [debouncedInputValue] = useDebounce(inputValue, debounceTime);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleSearchClick = () => {
    if (repositories.length > 0) {
      const firstResult = repositories[0]
      handleRepoSelect(firstResult);
    }
  };

  const performSearch = async () => {
    try {
      const response = await fetchRepositories(inputValue);
      if (response.data) {
        setRepositories(response.data.items);
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  useEffect(() => {
    if (debouncedInputValue) {
      performSearch();
    } else {
      setRepositories([]);
    }
  }, [debouncedInputValue]);

  const filteredRepositories = useMemo(() => {
    if (!repositories || repositories.length === 0 || !debouncedInputValue) {
      return [];
    }

    return repositories.filter((repo) =>
      repo.name.toLowerCase().includes(debouncedInputValue.toLowerCase())
    );
  }, [repositories, debouncedInputValue]);

  const handleRepoSelect = (repo) => {
    onSelect(repo.full_name);
    setInputValue('');
  };

  return (
    <div className="autocomplete-container">
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for a repository"
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="search-icon" onClick={handleSearchClick}>
          <img
            src="/search.svg"
            alt="Search"
          />
        </div>
      </div>
      {filteredRepositories.length > 0 && (
        <ul className="repository-list">
          {filteredRepositories.map((repo) => (
            <li key={repo.id} onClick={() => handleRepoSelect(repo)}>
              {repo.full_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;

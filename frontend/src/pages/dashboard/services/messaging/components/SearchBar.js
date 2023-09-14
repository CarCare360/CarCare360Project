import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBar({ onSearch }) {
  const [searchText, setSearchText] = useState("");
  const [showClearIcon, setShowClearIcon] = useState(false);

  const handleSearchChange = (event) => {
    const newValue = event.target.value;
    setSearchText(newValue);
    onSearch(newValue);
    setShowClearIcon(newValue !== "");
  };

  const handleClear = () => {
    setSearchText("");
    setShowClearIcon(false);
    onSearch("");
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={searchText}
        onChange={handleSearchChange}
        placeholder="Search"
      />
      <ClearButton onClick={handleClear}>
        {showClearIcon ? <ClearIcon /> : <SearchIcon />}
      </ClearButton>
    </SearchContainer>
  );
}

export default SearchBar;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid grey;
  border-radius: 1.5rem;
  padding: 4px;
  width: 100%;
`;

const SearchInput = styled.input`
  flex: 1;
  background-color: transparent;
  border: none;
  padding: 4px;
  outline: none;
`;

const ClearButton = styled.div`
  cursor: pointer;
  padding: 4px;
  border-radius: 1.5rem;
  transition: background 0.3s;
  &:hover {
    background: grey;
  }
`;

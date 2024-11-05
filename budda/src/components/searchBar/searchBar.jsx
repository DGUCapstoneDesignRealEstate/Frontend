import React, { useState } from 'react';
import styled from 'styled-components';
import { IoSearch } from 'react-icons/io5';
import './searchBar.css';

const BarWrapper = styled.div`
  position: relative;
  display: flex;
  height: 24px;
  width: 388px;
  background-color: #f9f1e3;
  gap: 20px;
  align-items: center;
  border-radius: 12px;
  padding-left: 12px;
  box-shadow: 0 2px 2px #ddd;
  margin-left: 28px;
`;

export default function SearchBar() {
  const [search, setSerach] = useState('');
  return (
    <BarWrapper>
      <IoSearch color="#CCAF78" />
      <input
        className="searchbartext"
        placeholder="아파트를 검색하시오."
        onChange={(e) => {
          setSerach(e.target.value);
        }}
      />
    </BarWrapper>
  );
}

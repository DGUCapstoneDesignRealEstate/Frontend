import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";
import "./searchBar.css";
import DoubtSelection from "../select/DoubtIcon";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  gap: clamp(16px, 2vw, 32px);
`;
const BarWrapper = styled.div`
  gap: clamp(16px, 1.2vw, 32px);
  padding: 0vh 2vw 0vh 2vw;
  display: flex;

  min-height: 24px;
  height: 3.2vh;
  min-width: 360px;
  width: 24vw;
  background-color: #f9f1e3;
  align-items: center;
  border-radius: 12px;
  box-shadow: 0 2px 2px #ddd;
  justify-content: center;
`;

export default function SearchBar() {
  const [search, setSerach] = useState("");
  return (
    <Wrapper>
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
      <DoubtSelection />
    </Wrapper>
  );
}

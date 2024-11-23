import React, { useState } from "react";
import styled from "styled-components";

const FilterWrapper = styled.div`
  position: relative;
  min-width: 320px;
  width: 24vw;
  min-height: 24px;
  height: 3.2vh;
  border-radius: 12px;
  background-color: #f9f1e3;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 2px #ddd;
  cursor: pointer;
  gap: clamp(12px, 2vw, 20px);
  font-family: "SCDream5";
  font-size: clamp(12px, 0.88vw, 24px);
`;
const FilterText = styled.div``;
const DateChoice = styled.input`
  border: none;
  background-color: transparent;
  font-family: "SCDream5";
  font-size: clamp(12px, 0.88vw, 24px);
  text-align: center;
`;
const Du = styled.div`
  display: flex;
  gap: clamp(8px, 0.4vw, 20px);
`;

export default function FilterDuration() {
  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <FilterWrapper>
      <FilterText> 기간 선택 </FilterText>
      <Du>
        <DateChoice
          type="date"
          max={endDate}
          onChange={handleStartDate}
          required
        />
        ~
        <DateChoice
          type="date"
          required
          min={startDate}
          max={today}
          onChange={handleEndDate}
        />
      </Du>
    </FilterWrapper>
  );
}

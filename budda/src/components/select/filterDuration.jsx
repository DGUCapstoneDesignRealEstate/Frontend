import React, { useState } from 'react';
import styled from 'styled-components';

const FilterWrapper = styled.div`
  position: relative;
`;
const FilterContainer = styled.div`
  width: 360px;
  height: 24px;
  border-radius: 12px;
  background-color: #f9f1e3;
  display: flex;
  align-items: end;
  justify-content: center;
  box-shadow: 0px 2px 2px #ddd;
  cursor: pointer;
  gap: 20px;
`;
const FilterText = styled.div`
  font-family: 'SCDream4';
  font-size: 14px;
  margin-bottom: 2px;
`;
const DateChoice = styled.input`
  border: none;
  background-color: transparent;
  font-family: 'SCDream5';
  font-size: 14px;
  margin-bottom: 1px;
  text-align: center;
  &&::before {
    content: attr(data-placeholder);
    font-size: smaller;
    font-family: 'SCDream4';
    font-size: 10px;
  }
  &&:focus::before,
  &&:valid::before {
    display: none;
  }
`;

export default function FilterDuration() {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(today);

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  return (
    <FilterWrapper>
      <FilterContainer>
        <FilterText> 기간 선택 </FilterText>
        <DateChoice
          type="date"
          max={endDate}
          onChange={handleStartDate}
          data-placeholder="시작일 선택"
          required
        />
        <DateChoice
          type="date"
          data-placeholder="종료일 선택"
          required
          min={startDate}
          max={today}
          onChange={handleEndDate}
        />
      </FilterContainer>
    </FilterWrapper>
  );
}

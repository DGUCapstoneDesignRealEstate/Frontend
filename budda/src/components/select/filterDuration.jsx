import React, { useState } from "react";
import * as S from "./filterDurationStyle";

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
    <S.FilterWrapper>
      <S.FilterText> 기간 선택 </S.FilterText>
      <S.Du>
        <S.DateChoice
          type="date"
          max={endDate}
          onChange={handleStartDate}
          required
        />
        ~
        <S.DateChoice
          type="date"
          required
          min={startDate}
          max={today}
          onChange={handleEndDate}
        />
      </S.Du>
    </S.FilterWrapper>
  );
}

import React from "react";
import * as S from "./filterDurationStyle";
import { useFilterContext } from "../../context/FilterContext";

export default function FilterDuration() {
  const { today, startDate, endDate, handleEndDate, handleStartDate } =
    useFilterContext();

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

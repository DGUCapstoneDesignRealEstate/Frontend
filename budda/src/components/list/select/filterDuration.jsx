import * as S from '../styles/filterDurationStyle.js';
import {
  useFilterActionContext,
  useFilterStateContext,
} from '../../../context/FilterContext';

export default function FilterDuration() {
  const { today, startDate, endDate } = useFilterStateContext();
  const { handleEndDate, handleStartDate } = useFilterActionContext();

  return (
    <S.FilterWrapper>
      <S.FilterText> 기간 선택 </S.FilterText>
      <S.Du>
        <S.DateChoice
          type="date"
          max={endDate}
          onChange={handleStartDate}
          required
          value={startDate}
        />
        ~
        <S.DateChoice
          type="date"
          required
          min={startDate}
          max={today}
          onChange={handleEndDate}
          value={endDate}
        />
      </S.Du>
    </S.FilterWrapper>
  );
}

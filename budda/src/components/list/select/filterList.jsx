import styled from 'styled-components';
import Filter from './filter';
import FilterDuration from './filterDuration';
import { arrayList, guList } from '../../../data/data';
import { useFilterContext } from '../../../context/FilterContext';

const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  gap: clamp(16px, 2vw, 32px);
`;

export default function FilterList() {
  const {
    filteredDong,
    aptList,
    areaList,
    handleGuChange,
    handleDongChange,
    handleAptChange,
    handleAreaChange,
    handleOrderType,
  } = useFilterContext();

  return (
    <FilterWrapper>
      <Filter list={arrayList} onChange={handleOrderType} />
      <Filter list={guList} onChange={handleGuChange} />
      <Filter list={filteredDong} onChange={handleDongChange} />
      <Filter list={aptList} width="240px" onChange={handleAptChange} />
      <Filter list={areaList} onChange={handleAreaChange} />
      <FilterDuration />
    </FilterWrapper>
  );
}

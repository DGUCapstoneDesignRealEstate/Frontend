import styled from 'styled-components';
import Filter from './filter';
import FilterDuration from './filterDuration';
import { arrayList, guList } from '../../../data/data';
import {
  useFilterActionContext,
  useFilterStateContext,
} from '../../../context/FilterContext';

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
    selectedGu,
    selectedDong,
    selectedApt,
    selectedArea,
    selectedOrderType,
  } = useFilterStateContext();
  const {
    handleGuChange,
    handleDongChange,
    handleAptChange,
    handleAreaChange,
    handleOrderType,
  } = useFilterActionContext();

  return (
    <FilterWrapper>
      <Filter
        list={arrayList}
        onChange={handleOrderType}
        selectedValue={selectedOrderType?.name}
      />
      <Filter
        list={guList}
        onChange={handleGuChange}
        selectedValue={selectedGu?.name}
      />
      <Filter
        list={filteredDong}
        onChange={handleDongChange}
        selectedValue={selectedDong?.name}
      />
      <Filter
        list={aptList}
        width="240px"
        onChange={handleAptChange}
        selectedValue={selectedApt?.apartmentName}
      />
      <Filter
        list={areaList}
        onChange={handleAreaChange}
        selectedValue={selectedArea?.areaForExclusiveUse}
      />
      <FilterDuration />
    </FilterWrapper>
  );
}

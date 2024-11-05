import React from 'react';
import styled from 'styled-components';
import Filter from './filter';
import FilterDuration from './filterDuration';

const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 28px;
  gap: 20px;
`;

export default function FilterList() {
  const arrayList = [
    { name: '최신순' },
    { name: '전용면적 넓은 순' },
    { name: '매매가 높은 순' },
    { name: '예측가 높은 순' },
  ];
  const guList = [
    { name: '서울 전체' },
    { name: '노원구' },
    { name: '강남구' },
    { name: '강서구' },
    { name: '강동구' },
    { name: '강북구' },
    { name: '성북구' },
    { name: '송파구' },
    { name: '동대문구' },
    { name: '서초구' },
    { name: '송파구' },
    { name: '중구' },
  ];
  const dongList = [{ name: '동 선택' }];
  const aptName = [{ name: '아파트 선택' }];
  const areaSelection = [{ name: '전용면적 선택' }];
  return (
    <FilterWrapper>
      <Filter list={arrayList} />
      <Filter list={guList} />
      <Filter list={dongList} />
      <Filter list={aptName} width="240px" />
      <Filter list={areaSelection} />
      <FilterDuration />
    </FilterWrapper>
  );
}

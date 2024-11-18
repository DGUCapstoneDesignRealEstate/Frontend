import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "./filter";
import FilterDuration from "./filterDuration";
import { arrayList, dongList, guList } from "./data";

const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 28px;
  gap: 20px;
`;

export default function FilterList() {
  const aptName = [{ name: "아파트 선택" }];
  const areaSelection = [{ name: "전용면적 선택" }];

  const [selectedGu, setSelectedGu] = useState(guList[0]); // 초기값: "서울 전체"
  const [filteredDong, setFilteredDong] = useState(
    dongList.filter((dong) => dong.guNum === guList[0].num)
  );

  useEffect(() => {
    if (selectedGu) {
      setFilteredDong(dongList.filter((dong) => dong.guNum === selectedGu.num));
    }
  }, [selectedGu]);

  const handleGuChange = (selectedGuName) => {
    const selectedGu = guList.find((gu) => gu.name === selectedGuName);
    setSelectedGu(selectedGu || guList[0]); // 선택된 구가 없으면 기본값 설정
  };

  return (
    <FilterWrapper>
      <Filter list={arrayList} />
      <Filter list={guList} onChange={handleGuChange} />
      <Filter list={filteredDong} />
      <Filter list={aptName} width="240px" />
      <Filter list={areaSelection} />
      <FilterDuration />
    </FilterWrapper>
  );
}

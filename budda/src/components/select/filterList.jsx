import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Filter from "./filter";
import FilterDuration from "./filterDuration";
import { arrayList, dongList, guList } from "./data";
import axios from "../../axios";

const FilterWrapper = styled.div`
  position: relative;
  display: flex;
  gap: clamp(16px, 2vw, 32px);
`;

export default function FilterList() {
  const [selectedGu, setSelectedGu] = useState(guList[0]); // 초기값: "서울 전체"
  const [filteredDong, setFilteredDong] = useState(
    dongList.filter((dong) => dong.guNum === guList[0].num)
  );
  const [selectedDong, setSelectedDong] = useState(filteredDong[0]);
  const [aptList, setAptList] = useState([{ apartmentName: "아파트 선택" }]);
  const [areaList, setAreaList] = useState([
    { areaForExclusiveUse: "전용면적 선택" },
  ]);
  const [selectedApt, setSelectedApt] = useState("아파트 선택");
  const [selectedArea, setSelectedArea] = useState("전용면적 선택");

  useEffect(() => {
    setFilteredDong(dongList.filter((dong) => dong.guNum === selectedGu.num));
  }, [selectedGu]);

  const handleGuChange = (selectedGuName) => {
    const selectedGu = guList.find((gu) => gu.name === selectedGuName);
    setSelectedGu(selectedGu || guList[0]); // 선택된 구가 없으면 기본값 설정
  };

  useEffect(() => {
    fetchAptList();
  }, [selectedDong]);

  const handleDongChange = (selDong) => {
    const selectedDong = filteredDong.find((dong) => dong.name === selDong);
    setSelectedDong(selectedDong || filteredDong[0]);
  };

  const fetchAptList = async () => {
    try {
      const response = await axios.get(
        "apartment-transactions/apartment-name",
        {
          params: {
            gu: selectedGu.name,
            dong: selectedDong.name,
            notValid: true,
          },
        }
      );
      setAptList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchAreaList();
  }, [selectedApt]);

  const handleAptChange = (selected) => {
    const selectedApt = aptList.find((apt) => apt.apartmentName === selected);
    setSelectedApt(selectedApt || aptList[0]);
  };

  const fetchAreaList = async () => {
    try {
      const response = await axios.get("apartment-transactions/area", {
        params: {
          gu: selectedGu.name,
          dong: selectedDong.name,
          apartmentName: selectedApt.apartmentName,
          notValid: true,
        },
      });
      setAreaList(response.data);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <FilterWrapper>
      <Filter list={arrayList} />
      <Filter list={guList} onChange={handleGuChange} />
      <Filter list={filteredDong} onChange={handleDongChange} />
      <Filter list={aptList} width="240px" onChange={handleAptChange} />
      <Filter list={areaList} />
      <FilterDuration />
    </FilterWrapper>
  );
}

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import axios from "../axios";
import { guList, dongList, arrayList } from "../components/select/data";

const FilterContext = createContext();

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [selectedGu, setSelectedGu] = useState(guList[0]);
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
  const [selectedOrderType, setSelectedOrderType] = useState(arrayList[0]);

  // 아파트 목록 가져오는 함수
  const fetchAptList = useCallback(async () => {
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
    } catch (e) {
      console.log(e);
    }
  }, [selectedGu, selectedDong]);

  // 면적 목록 가져오는 함수
  const fetchAreaList = useCallback(async () => {
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
    } catch (e) {
      console.log(e);
    }
  }, [selectedGu, selectedDong, selectedApt]);

  // 구 변경 시 필터링된 동 목록 업데이트
  useEffect(() => {
    setFilteredDong(dongList.filter((dong) => dong.guNum === selectedGu.num));
  }, [selectedGu]);

  // 동 변경 시 아파트 목록 요청
  useEffect(() => {
    fetchAptList();
  }, [selectedDong]);

  // 아파트 변경 시 면적 목록 요청
  useEffect(() => {
    fetchAreaList();
  }, [selectedApt]);

  // 구 선택 변경 핸들러
  const handleGuChange = (selectedGuName) => {
    const selectedGu = guList.find((gu) => gu.name === selectedGuName);
    setSelectedGu(selectedGu || guList[0]); // 선택된 구가 없으면 기본값 설정
  };

  // 동 선택 변경 핸들러
  const handleDongChange = (selDong) => {
    const selectedDong = filteredDong.find((dong) => dong.name === selDong);
    setSelectedDong(selectedDong || filteredDong[0]);
  };

  // 아파트 선택 변경 핸들러
  const handleAptChange = (selected) => {
    const selectedApt = aptList.find((apt) => apt.apartmentName === selected);
    setSelectedApt(selectedApt || "아파트 선택");
  };

  // 면적 선택 변경 핸들러
  const handleAreaChange = (selected) => {
    const selectedArea = areaList.find(
      (area) => area.areaForExclusiveUse === selected
    );
    setSelectedArea(selectedArea || "전용면적 선택");
  };

  const handleOrderType = (selected) => {
    const selectedorder = arrayList.find((order) => order.name === selected);
    setSelectedOrderType(selectedorder || arrayList[0]);
  };

  const today = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const [isDoubt, setIsDoubt] = useState(false);
  const [reliability, setReliability] = useState("ALL");
  const [isPressed, setIsPressed] = useState(false);

  const handleDoubt = () => {
    setIsDoubt((prev) => !prev);
    if (isDoubt === false) {
      setReliability("UNRELIABLE");
    } else {
      setReliability("ALL");
    }
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200); // 애니메이션 끝나면 초기화
  };

  return (
    <FilterContext.Provider
      value={{
        selectedGu,
        setSelectedGu,
        filteredDong,
        setFilteredDong,
        selectedDong,
        setSelectedDong,
        aptList,
        setAptList,
        areaList,
        setAreaList,
        selectedApt,
        setSelectedApt,
        selectedArea,
        selectedOrderType,
        setSelectedOrderType,
        setSelectedArea,
        handleGuChange,
        handleDongChange,
        handleAptChange,
        handleAreaChange,
        handleOrderType,

        today,
        startDate,
        endDate,
        handleStartDate,
        handleEndDate,

        isDoubt,
        isPressed,
        handleDoubt,
        reliability,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

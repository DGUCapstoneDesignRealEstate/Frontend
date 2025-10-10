import { createContext, useContext, useState, useEffect } from 'react';
import { guList, dongList, arrayList } from '../data/data';
import getAptList from '../apis/filter/getAptList';
import getAreaList from '../apis/filter/getAreaList';

const FilterStateContext = createContext();
const FilterActionContext = createContext();

export const useFilterStateContext = () => useContext(FilterStateContext);
export const useFilterActionContext = () => useContext(FilterActionContext);

export const FilterProvider = ({ children }) => {
  const [selectedGu, setSelectedGu] = useState(guList[0]);
  const [filteredDong, setFilteredDong] = useState(
    dongList.filter((dong) => dong.guNum === guList[0].num)
  );
  const [selectedDong, setSelectedDong] = useState(filteredDong[0]);
  const [aptList, setAptList] = useState([{ apartmentName: '아파트 선택' }]);
  const [areaList, setAreaList] = useState([
    { areaForExclusiveUse: '전용면적 선택' },
  ]);
  const [selectedApt, setSelectedApt] = useState('아파트 선택');
  const [selectedArea, setSelectedArea] = useState('전용면적 선택');
  const [selectedOrderType, setSelectedOrderType] = useState(arrayList[0]);

  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(today);

  const [isDoubt, setIsDoubt] = useState(false);
  const [reliability, setReliability] = useState('ALL');
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    setFilteredDong(dongList.filter((dong) => dong.guNum === selectedGu.num));
  }, [selectedGu]);

  useEffect(() => {
    setAptList(getAptList(selectedGu, selectedDong));
  }, [selectedGu, selectedDong]);

  useEffect(() => {
    setAreaList(getAreaList(selectedGu, selectedDong, selectedApt));
  }, [selectedGu, selectedDong, selectedApt]);

  // 구 선택 변경 핸들러
  const handleGuChange = (selectedGuName) => {
    const selectedGu = guList.find((gu) => gu.name === selectedGuName);
    setSelectedGu(selectedGu || guList[0]); // 선택된 구가 없으면 기본값 설정
  };

  // 동 선택 변경 핸들러
  const handleDongChange = (selected) => {
    const selectedDong = filteredDong.find((dong) => dong.name === selected);
    setSelectedDong(selectedDong || filteredDong[0]);
  };

  // 아파트 선택 변경 핸들러
  const handleAptChange = (selected) => {
    const selectedApt = aptList.find((apt) => apt.apartmentName === selected);
    setSelectedApt(selectedApt || '아파트 선택');
  };

  // 면적 선택 변경 핸들러
  const handleAreaChange = (selected) => {
    const selectedArea = areaList.find(
      (area) => area.areaForExclusiveUse === selected
    );
    setSelectedArea(selectedArea || '전용면적 선택');
  };

  const handleOrderType = (selected) => {
    const selectedorder = arrayList.find((order) => order.name === selected);
    setSelectedOrderType(selectedorder || arrayList[0]);
  };

  const handleStartDate = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
  };

  const handleDoubt = () => {
    setIsDoubt((prev) => !prev);
    if (isDoubt === false) {
      setReliability('UNRELIABLE');
    } else {
      setReliability('ALL');
    }
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200); // 애니메이션 끝나면 초기화
  };

  const stateValue = {
    selectedGu,
    filteredDong,
    selectedDong,
    aptList,
    areaList,
    selectedApt,
    selectedArea,
    selectedOrderType,
    startDate,
    endDate,
    today,
    isDoubt,
    reliability,
    isPressed,
  };

  const actionsValue = {
    handleGuChange,
    handleDongChange,
    handleAptChange,
    handleAreaChange,
    handleOrderType,
    handleStartDate,
    handleEndDate,
    handleDoubt,
  };

  return (
    <FilterStateContext.Provider value={stateValue}>
      <FilterActionContext.Provider value={actionsValue}>
        {children}
      </FilterActionContext.Provider>
    </FilterStateContext.Provider>
  );
};

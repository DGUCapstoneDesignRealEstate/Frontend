import { useEffect, useState } from 'react';
import { useFilterContext } from '../context/FilterContext';
import api from '../axios';
import useUrlQuery from './useUrlQuery';

export default function useTradeList() {
  const {
    selectedOrderType,
    selectedGu,
    selectedDong,
    selectedApt,
    selectedArea,
    startDate,
    endDate,
    isDoubt,
    reliability,
    setSelectedGu,
    setFilteredDong,
    setSelectedDong,
    setSelectedApt,
    setSelectedArea,
    setSelectedOrderType,
    handleStartDate,
    handleEndDate,
    handleDoubt,
  } = useFilterContext();

  const [pageNum, setPageNum] = useState(1); //리스트 현재 페이지 번호
  const [aptList, setAptList] = useState([]); //아파트 리스트
  const [totalPage, setTotalPage] = useState(1); //리스트 총 페이지 수
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handlePage = (page) => {
    if (page > 0 && page <= totalPage) setPageNum(page);
  };

  useEffect(() => {
    setShouldAnimate(true);
    const timer = setTimeout(() => setShouldAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [pageNum]);

  const [load, setLoad] = useState(false);
  const fetchAptList = async () => {
    setLoad(true);
    try {
      const response = await api.get('apartment-transactions', {
        params: {
          gu: selectedGu.name,
          dong: selectedDong.name,
          apartmentName: selectedApt.apartmentName,
          areaForExclusiveUse: selectedArea.areaForExclusiveUse,
          startDealDate: startDate,
          endDealDate: endDate,
          reliability: reliability,
          notValid: true,
          order: selectedOrderType.inorder,
          orderType: selectedOrderType.eng,
          page: pageNum - 1,
        },
      });
      setAptList(response.data.content);
      setTotalPage(response.data.page.totalPages);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchAptList();
  }, [
    pageNum,
    selectedGu,
    selectedDong,
    selectedApt,
    selectedArea,
    selectedOrderType,
    startDate,
    endDate,
    isDoubt,
    reliability,
  ]);

  useUrlQuery(
    {
      gu: selectedGu?.name,
      dong: selectedDong?.name,
      apt: selectedApt?.apartmentName,
      area: selectedArea?.areaForExclusiveUse,
      order: selectedOrderType?.eng || 'DEAL_DATE',
      from: startDate || undefined,
      to: endDate || undefined,
      rel: reliability,
    },
    pageNum,
    {
      setSelectedGu,
      setFilteredDong,
      setSelectedDong,
      setSelectedApt,
      setSelectedArea,
      setSelectedOrderType,
      handleStartDate,
      handleEndDate,
      handleDoubt,
      currentReliability: reliability,
      setPage: setPageNum,
    },
    {
      defaults: { order: 'DEAL_DATE', page: 1 },
      pushOnPageChange: true,
      replaceOnFilterChange: true,
    }
  );

  return {
    aptList,
    load,
    handlePage,
    pageNum,
    totalPage,
    shouldAnimate,
  };
}

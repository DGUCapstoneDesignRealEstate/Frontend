import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./listComponentStyle";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import axios from "../../axios";
import { useFilterContext } from "../../context/FilterContext";
import None from "./none";

export default function ListCompo() {
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
  } = useFilterContext();

  const nav = useNavigate();
  const [pageNum, setPageNum] = useState(1); //리스트 현재 페이지 번호
  const [aptList, setAptList] = useState([]); //아파트 리스트
  const [totalPage, setTotalPage] = useState(1); //리스트 총 페이지 수
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handlePage = (page) => {
    if (page > 0 && page <= totalPage) setPageNum(page);
  };

  useEffect(() => {
    setShouldAnimate(true);
    const timer = setTimeout(() => setShouldAnimate(false), 500); // 애니메이션 지속 시간 (0.5초)과 동일
    return () => clearTimeout(timer);
  }, [pageNum]);

  const [load, setLoad] = useState(false);

  const fetchAptList = async () => {
    setLoad(true);
    try {
      const response = await axios.get("apartment-transactions", {
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
          orderType: selectedGu.eng,
          page: pageNum - 1,
        },
      });
      console.log(selectedOrderType.inorder, selectedOrderType.eng, isDoubt);
      setAptList(response.data.content);
      setTotalPage(response.data.page.totalPages);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    console.log(startDate, endDate, isDoubt, reliability);
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

  if (!aptList) {
    return <div>로딩 중...</div>;
  }
  return (
    <S.Wrapper>
      <S.Header>
        <S.AptName>아파트명</S.AptName>
        <S.Location>지역</S.Location>
        <S.Area>전용 면적</S.Area>
        <S.SaleDate>거래일자</S.SaleDate>
        <S.RealPrice>실거래가(단위: 만 원)</S.RealPrice>
        <S.PredictPrice>예측거래가(단위: 만 원)</S.PredictPrice>
        <S.DoubtType>의심 여부</S.DoubtType>
      </S.Header>
      <S.List>
        {!load ? (
          aptList.map((apt, index) => (
            <S.Item
              shouldAnimate={shouldAnimate}
              key={apt.id}
              onClick={() => {
                nav(`/detail/${apt.id}`);
              }}
            >
              <S.AptName>{apt.apartmentName}</S.AptName>
              <S.Location>{apt.region}</S.Location>
              <S.Area>
                {apt.areaForExclusiveUse}m<sup>2</sup>
              </S.Area>
              <S.SaleDate>{apt.dealDate}</S.SaleDate>
              <S.RealPrice>{apt.dealAmount} (만 원)</S.RealPrice>
              <S.PredictPrice>{apt.predictedCost} (만 원)</S.PredictPrice>
              <S.DoubtType>
                {apt.isReliable === true ? <div>정상</div> : <div>의심</div>}
              </S.DoubtType>
            </S.Item>
          ))
        ) : (
          <None noText="로딩 중..." />
        )}
      </S.List>
      {!load ? (
        <S.PageWrapper>
          <S.But>
            <IoCaretBack
              onClick={() => handlePage(pageNum - 1)}
              disabled={pageNum <= 1}
              cursor="pointer"
            />
          </S.But>
          <S.Num>
            {pageNum} / {totalPage}
          </S.Num>
          <S.But>
            <IoCaretForward
              onClick={() => handlePage(pageNum + 1)}
              disabled={pageNum >= totalPage}
              cursor="pointer"
            />
          </S.But>
        </S.PageWrapper>
      ) : (
        <div></div>
      )}
    </S.Wrapper>
  );
}

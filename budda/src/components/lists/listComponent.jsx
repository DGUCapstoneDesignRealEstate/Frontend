import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./listComponentStyle";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";
import axios from "../../axios";
import { useFilterContext } from "../../context/FilterContext";
import { arrayList } from "../select/data";
import qs from "qs";

export default function ListCompo() {
  const {
    selectedOrderType,
    selectedGu,
    selectedDong,
    selectedApt,
    selectedArea,
  } = useFilterContext();

  const startDate = "2006-01-01";
  const endDate = Date.now();

  const nav = useNavigate();
  const itemCnt = 12;
  const [pageNum, setPageNum] = useState(1);
  const startId = (pageNum - 1) * itemCnt;
  const endId = startId + itemCnt;
  const [aptList, setAptList] = useState([]);
  const currentList = aptList.slice(startId, endId);
  const totalPages = Math.ceil(aptList.length / itemCnt);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const handlePage = (page) => {
    if (page > 0 && page <= totalPages) setPageNum(page);
  };

  useEffect(() => {
    setShouldAnimate(true);
    const timer = setTimeout(() => setShouldAnimate(false), 500); // 애니메이션 지속 시간 (0.5초)과 동일
    return () => clearTimeout(timer);
  }, [pageNum]);

  const [engOrder, setEngOrder] = useState("DEAL_DATE");
  const [inOrder, setInOrder] = useState("DESC");
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (selectedOrderType === arrayList[0]) {
      setEngOrder("DEAL_DATE");
      setInOrder("DESC");
    } else if (selectedOrderType === arrayList[1]) {
      setEngOrder("AREA_FOR_EXCLUSIVE_USE");
      setInOrder("DESC");
    } else {
      setEngOrder("DEAL_AMOUNT");
      setInOrder("DESC");
    }
  }, [selectedOrderType]);

  const fetchAptList = async () => {
    setLoad(true);
    try {
      const param1 = {
        gu: selectedGu.name,
        dong: selectedDong.name,
        apartmentName: selectedApt.apartmentName,
        areaForExclusiveUse: selectedArea.areaForExclusiveUse,
        startDealDate: startDate,
        endDealDate: endDate,
        realiability: "ALL",
        notValid: true,
      };
      const param2 = {
        order: inOrder,
        orderType: engOrder,
        page: 0,
      };
      const response = await axios.get("apartment-transactions", {
        params: {
          searchCondition: param1,
          customPageable: param2,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, {
            arrayFormat: "brackets",
            skipNulls: true,
            encode: true,
          });
        },
      });
      console.log(response.data.content);
      setAptList(response.data.content);
      setPageNum(response.data.numberOfElemnets);
    } catch (e) {
      console.log(e);
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    fetchAptList();
  }, [selectedGu, selectedDong, selectedApt, selectedArea, selectedOrderType]);

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
        {load ? (
          <div>로딩 중...</div>
        ) : (
          aptList.map((apt, index) => (
            <S.Item
              shouldAnimate={shouldAnimate}
              key={index}
              onClick={() => nav(`/detail/${startId + index + 1}`)}
            >
              <S.AptName>{apt.apartmentName}</S.AptName>
              <S.Location>{apt.region}</S.Location>
              <S.Area>
                {apt.areaForExclusiveUse}m<sup>2</sup>
              </S.Area>
              <S.SaleDate>{apt.dealDate}</S.SaleDate>
              <S.RealPrice>{apt.dealAmount} (만 원)</S.RealPrice>
              <S.PredictPrice>{apt.predictedCost} (만 원)</S.PredictPrice>
              <S.DoubtType>{apt.isRealiable}</S.DoubtType>
            </S.Item>
          ))
        )}
      </S.List>
      <S.PageWrapper>
        <S.But>
          <IoCaretBack
            onClick={() => handlePage(pageNum - 1)}
            disabled={pageNum === 1}
            cursor="pointer"
          />
        </S.But>
        <S.Num>
          {pageNum} / {totalPages}
        </S.Num>
        <S.But>
          <IoCaretForward
            onClick={() => handlePage(pageNum + 1)}
            disabled={pageNum === totalPages}
            cursor="pointer"
          />
        </S.But>
      </S.PageWrapper>
    </S.Wrapper>
  );
}

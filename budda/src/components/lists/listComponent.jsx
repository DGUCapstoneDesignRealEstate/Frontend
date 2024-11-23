import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import aptList from "./data";
import * as S from "./listComponentStyle";
import { IoCaretBack, IoCaretForward } from "react-icons/io5";

export default function ListCompo() {
  const nav = useNavigate();
  const itemCnt = 12;
  const [pageNum, setPageNum] = useState(1);
  const startId = (pageNum - 1) * itemCnt;
  const endId = startId + itemCnt;
  const currentList = aptList.slice(startId, endId);
  const totalPages = Math.ceil(aptList.length / itemCnt);

  const handlePage = (page) => {
    if (page > 0 && page <= totalPages) setPageNum(page);
  };

  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    setShouldAnimate(true);
    const timer = setTimeout(() => setShouldAnimate(false), 500); // 애니메이션 지속 시간 (0.5초)과 동일
    return () => clearTimeout(timer);
  }, [pageNum]);

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
        {currentList.map((apt, index) => (
          <S.Item
            shouldAnimate={shouldAnimate}
            key={index}
            onClick={() => nav(`/detail/${startId + index + 1}`)}
          >
            <S.AptName>{apt.name}</S.AptName>
            <S.Location>{apt.loc}</S.Location>
            <S.Area>
              {apt.area}m<sup>2</sup>
            </S.Area>
            <S.SaleDate>{apt.sale}</S.SaleDate>
            <S.RealPrice>{apt.real} (만 원)</S.RealPrice>
            <S.PredictPrice>{apt.pred} (만 원)</S.PredictPrice>
            <S.DoubtType>{apt.doubt}</S.DoubtType>
          </S.Item>
        ))}
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

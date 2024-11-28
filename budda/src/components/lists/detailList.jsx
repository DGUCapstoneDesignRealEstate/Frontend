import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import aptList from "./data";
import * as S from "./detailListStyle";

export default function DetailList() {
  const dataId = parseInt(useParams().id - 1);
  const apt = aptList[dataId];
  const saleType = "중개거래";
  const buildYear = 2002;
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);
  return (
    <S.Wrapper>
      <S.Feature>
        <S.SaleDate animate={animate}>
          <S.Title>거래일자</S.Title>
          <S.Text>{apt.sale}</S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>전용 면적</S.Title>
          <S.Text>
            {apt.area}m<sup>2</sup>
          </S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>건축 년도</S.Title>
          <S.Text>{buildYear}년</S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>거래 유형</S.Title>
          <S.Text>{saleType}</S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>실거래가</S.Title>
          <S.Text>{apt.real} (만 원)</S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>예측 거래가</S.Title>
          <S.Text>{apt.pred} (만 원)</S.Text>
        </S.SaleDate>
      </S.Feature>
    </S.Wrapper>
  );
}

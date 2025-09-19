import React, { useEffect, useState } from 'react';
import * as S from './styles/detailListStyle';
import None from '../common/none';
import { useDetailContext } from '../../context/DetailContext';

export default function DetailList() {
  const { aptInfo } = useDetailContext();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  if (!aptInfo) {
    return (
      <div style={{ marginLeft: '4vw' }}>
        <None noText="해당 아파트 정보가 없습니다." />
      </div>
    );
  }

  return (
    <S.Wrapper>
      <S.Feature>
        <S.SaleDate animate={animate}>
          <S.Title>거래일자</S.Title>
          <S.Text>{aptInfo.dealDate}</S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>전용 면적</S.Title>
          <S.Text>
            {aptInfo.areaForExclusiveUse}m<sup>2</sup>
          </S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>건축 년도</S.Title>
          <S.Text>{aptInfo.buildYear}년</S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>거래 유형</S.Title>
          {aptInfo.dealingGbn === null ? (
            <S.Text>알 수 없음</S.Text>
          ) : (
            <S.Text>{aptInfo.dealingGbn}</S.Text>
          )}
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>실거래가</S.Title>
          <S.Text>{aptInfo.dealAmount} (만 원)</S.Text>
        </S.SaleDate>
        <S.SaleDate animate={animate}>
          <S.Title>예측 거래가</S.Title>
          <S.Text>{aptInfo.predictCost} (만 원)</S.Text>
        </S.SaleDate>
      </S.Feature>
    </S.Wrapper>
  );
}

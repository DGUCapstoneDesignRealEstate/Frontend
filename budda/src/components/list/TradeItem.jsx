import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styles/TradeList.styled';

export default function TradeItem({ apt, shouldAnimate }) {
  const nav = useNavigate();
  const [params, setParams] = useState(null);

  const navigateToDetail = () => {
    const queryParams = new URLSearchParams(params).toString();
    nav(`/detail/${apt.id}?${queryParams}`);
  };

  return (
    <S.Item
      shouldAnimate={shouldAnimate}
      key={apt.id}
      onClick={() => {
        navigateToDetail(apt.id);
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
  );
}

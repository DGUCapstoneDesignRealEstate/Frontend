import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import aptList from './data';

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin-left: 40px;
  margin-top: -4px;
`;
const Feature = styled.div`
  display: flex;
  gap: 48px;
`;
const Location = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  white-space: nowrap;
`;
const Num = styled(Location)`
  align-items: center;
  min-width: 28px;
`;
const AptName = styled(Location)`
  max-width: 240px;
`;
const Area = styled(Num)``;
const SaleDate = styled(Location)``;
const RealPrice = styled(Num)``;
const PredictPrice = styled(Num)``;
const DoubtType = styled(Num)`
  margin-right: 28px;
`;
const FeatureTitle = styled.div`
  display: flex;
  line-height: 24px;
  font-family: 'SCDream4';
  font-size: 14px;
`;
const List = styled.div`
  animation: ${slideDown} 0.4s ease-in;
  line-height: 24px;
  font-family: 'SCDream3';
  font-size: 14px;
  height: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`;
const SupText = styled(List)`
  display: flex;
`;

export default function ListCompo() {
  const nav = useNavigate();

  return (
    <Wrapper>
      <Feature>
        <Num>
          <FeatureTitle>순번</FeatureTitle>
          {aptList.map((_, index) => (
            <List key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {index + 1}
            </List>
          ))}
        </Num>
        <AptName>
          <FeatureTitle>아파트명</FeatureTitle>
          {aptList.map((apt, index) => (
            <List key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {apt.name}
            </List>
          ))}
        </AptName>
        <Location>
          <FeatureTitle>지역</FeatureTitle>
          {aptList.map((apt, index) => (
            <List key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {apt.loc}
            </List>
          ))}
        </Location>
        <Area>
          <FeatureTitle>전용 면적</FeatureTitle>
          {aptList.map((apt, index) => (
            <SupText key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {apt.area}m<sup>2</sup>
            </SupText>
          ))}
        </Area>
        <SaleDate>
          <FeatureTitle>거래일자</FeatureTitle>
          {aptList.map((apt, index) => (
            <List key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {apt.sale}
            </List>
          ))}
        </SaleDate>
        <RealPrice>
          <FeatureTitle>실거래가(단위: 만 원)</FeatureTitle>
          {aptList.map((apt, index) => (
            <List key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {apt.real}
            </List>
          ))}
        </RealPrice>
        <PredictPrice>
          <FeatureTitle>예측거래가(단위: 만 원)</FeatureTitle>
          {aptList.map((apt, index) => (
            <List key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {apt.pred}
            </List>
          ))}
        </PredictPrice>
        <DoubtType>
          <FeatureTitle>의심 여부</FeatureTitle>
          {aptList.map((apt, index) => (
            <List key={index} onClick={() => nav(`/detail/${index + 1}`)}>
              {apt.doubt}
            </List>
          ))}
        </DoubtType>
      </Feature>
    </Wrapper>
  );
}

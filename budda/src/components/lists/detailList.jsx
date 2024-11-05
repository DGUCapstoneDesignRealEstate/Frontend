import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import aptList from './data';

const Wrapper = styled.div`
  display: flex;
  margin-left: 40px;
  margin-top: 24px;
  margin-bottom: 40px;
`;
const Feature = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const SaleDate = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
`;
const Title = styled.div`
  display: flex;
  font-family: 'SCDream3';
  font-size: 14px;
  width: 120px;
`;
const Text = styled.div`
  display: flex;
  font-family: 'SCDream4';
  font-size: 14px;
  white-space: nowrap;
  width: 200px;
`;

export default function DetailList() {
  const dataId = parseInt(useParams().id - 1);
  const apt = aptList[dataId];
  const saleType = '중개거래';
  const buildYear = 2002;
  return (
    <Wrapper>
      <Feature>
        <SaleDate>
          <Title>거래일자</Title>
          <Text>{apt.sale}</Text>
        </SaleDate>
        <SaleDate>
          <Title>전용 면적</Title>
          <Text>
            {apt.area}m<sup>2</sup>
          </Text>
        </SaleDate>
        <SaleDate>
          <Title>건축 년도</Title>
          <Text>{buildYear}년</Text>
        </SaleDate>
        <SaleDate>
          <Title>거래 유형</Title>
          <Text>{saleType}</Text>
        </SaleDate>
        <SaleDate>
          <Title>실거래가</Title>
          <Text>{apt.real} (만 원)</Text>
        </SaleDate>
        <SaleDate>
          <Title>예측 거래가</Title>
          <Text>{apt.pred} (만 원)</Text>
        </SaleDate>
      </Feature>
    </Wrapper>
  );
}

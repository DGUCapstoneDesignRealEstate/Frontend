import React from 'react';
import styled from 'styled-components';
import Header from '../../components/header/header';
import DetailList from '../../components/lists/detailList';
import LineGraph from '../../components/lists/LineGraph';
import KakaoMap from '../../components/kakaoMap';
import FooterHome from '../../components/footer/footerStart';
import { useParams } from 'react-router-dom';
import aptList from '../../components/lists/data';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 144px);
  display: flex;
  flex-direction: column;
  top: 96px;
  overflow: scroll;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #f9f1e3;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;
const Content = styled.div`
  display: flex;
  gap: 60px;
  align-items: center;
`;

export default function Detail() {
  const dataId = parseInt(useParams().id) - 1;
  const title = aptList[dataId].name;

  return (
    <Wrapper>
      <Content>
        <DetailList />
        <KakaoMap />
      </Content>
      <LineGraph />
      <FooterHome />
      <Header title={title} />
    </Wrapper>
  );
}

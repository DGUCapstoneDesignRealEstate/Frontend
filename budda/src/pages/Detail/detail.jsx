import React from "react";
import styled from "styled-components";
import Header from "../../components/header/header";
import DetailList from "../../components/lists/detailList";
import LineGraph from "../../components/lists/LineGraph";
import KakaoMap from "../../components/kakaoMap";
import { useParams } from "react-router-dom";
import aptList from "../../components/lists/data";

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  display: flex;
  flex-direction: column;
  top: 96px;
  overflow: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  height: calc(100vh - 96px);
`;

const Content = styled.div`
  display: flex;
  gap: 4vw;
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
      <Header title={title} />
    </Wrapper>
  );
}

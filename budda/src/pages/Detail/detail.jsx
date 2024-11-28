import React from "react";
import styled from "styled-components";
import Header from "../../components/header/header";
import DetailList from "../../components/lists/detailList";
import LineGraph from "../../components/lists/LineGraph";
import KakaoMap from "../../components/kakaoMap";
import { useDetailContext } from "../../context/DetailContext";

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
  const { aptInfo } = useDetailContext();
  if (!aptInfo) {
    return <div>아파트 정보 없음</div>;
  }

  return (
    <Wrapper>
      <Content>
        <DetailList />
        <KakaoMap />
      </Content>
      <LineGraph />
      <Header title={aptInfo.apartmentName} />
    </Wrapper>
  );
}

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const [params, setParams] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    // URL 쿼리 파라미터 읽기
    const queryParams = new URLSearchParams(location.search);
    const paramsFromUrl = {
      gu: queryParams.get("gu"),
      dong: queryParams.get("dong"),
      apartmentName: queryParams.get("apartmentName"),
      areaForExclusiveUse: queryParams.get("areaForExclusiveUse"),
      startDealDate: queryParams.get("startDealDate"),
      endDealDate: queryParams.get("endDealDate"),
      reliability: queryParams.get("reliability"),
      order: queryParams.get("order"),
      orderType: queryParams.get("orderType"),
    };
    setParams(paramsFromUrl); // 쿼리 파라미터를 상태에 설정
  }, [location.search]); // location.search가 변경될 때마다 실행

  console.log(params);

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

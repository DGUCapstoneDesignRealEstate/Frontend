import React from "react";
import { useKakaoLoader, Map, MapMarker } from "react-kakao-maps-sdk";
import styled from "styled-components";
import "./kakaoMap.css";

const MapWrapper = styled.div`
  width: 56.8vw;
  height: 40vh;
  position: relative;
`;
export default function KakaoMap() {
  const lati = 37.646070847794;
  const longi = 127.06003349152;
  const loc = {
    lat: lati,
    lng: longi,
  };

  useKakaoLoader({
    appkey: process.env.REACT_APP_API_KEY,
    libraries: ["clusterer", "drawing", "services"],
  });
  return (
    <MapWrapper>
      <Map
        id="map"
        center={loc}
        style={{
          width: "56.8vw",
          height: "40vh",
        }}
        level={2} // 지도의 확대 레벨
      >
        <MapMarker position={loc} />
      </Map>
    </MapWrapper>
  );
}

import React from 'react';
import { useKakaoLoader, Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';
import './kakaoMap.css';
import { useDetailContext } from '../../../context/DetailContext';

const MapWrapper = styled.div`
  width: 56.8vw;
  height: 40vh;
  position: relative;
`;
export default function KakaoMap() {
  useKakaoLoader({
    appkey: process.env.REACT_APP_API_KEY,
    libraries: ['clusterer', 'drawing', 'services'],
  });

  const { aptInfo } = useDetailContext();
  if (!aptInfo) {
    return <div>아파트 정보 없음</div>;
  }

  const lati = aptInfo.y; //위도 37 부근
  const longi = aptInfo.x; //경도 127 부근
  console.log(lati, longi);
  const loc = {
    lat: lati,
    lng: longi,
  };

  return (
    <MapWrapper>
      <Map
        id="map"
        center={loc}
        style={{
          width: '56.4vw',
          height: '40vh',
        }}
        level={2} // 지도의 확대 레벨
      >
        <MapMarker position={loc} />
      </Map>
    </MapWrapper>
  );
}

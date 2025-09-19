import styled from 'styled-components';

export const HeaderContainer = styled.div`
  height: 96px;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #e4d6be;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 4px #00000030;
  z-index: 1000;
`;

export const HeaderBox = styled.div`
  position: relative;
  width: 1920px;
  left: 20px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const HeaderTitle = styled.span`
  margin: 0;
  font-weight: 700;
  font-size: 36px;
  width: max-content;
`;

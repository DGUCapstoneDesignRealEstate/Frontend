import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-40%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 1.2vh;
  padding: 0vh 4vw 0vh 4vw;
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  font-weight: 500;
  gap: 2vw;
  font-size: clamp(14px, 1vw, 28px);
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  font-size: clamp(12px, 0.88vw, 24px);
  width: fit-content;
  gap: 1.2vh;
`;

export const Item = styled.div`
  animation: ${({ shouldAnimate }) => (shouldAnimate ? slideDown : 'none')} 0.3s
    ease-in;
  display: flex;
  gap: 2vw;
  cursor: pointer;
  min-height: 20px;
  height: 2.8vh;
  border: solid 2.4px #e4d6be;
  padding: 0.4vh;
  border-radius: 0.8vh;
  box-shadow: 2px 2px 2px #00000040;
  background-color: white;
  align-items: center;
  &:hover,
  &:active {
    transform: scale(0.98);
    transition: transform 0.2s ease;
    border-color: #c69b0f;
    font-weight: 500;
  }
`;

export const AptName = styled.div`
  width: 16vw;
  min-width: 200px;
  display: flex;
  justify-content: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Location = styled.div`
  width: 8vw;
  display: flex;
  min-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: center;
`;

export const Area = styled(Location)``;
export const SaleDate = styled(Location)``;
export const RealPrice = styled(Location)`
  width: 12vw;
  min-width: 180px;
`;

export const PredictPrice = styled(RealPrice)``;
export const DoubtType = styled(Location)``;

export const PageWrapper = styled.div`
  position: fixed;
  display: flex;
  gap: clamp(16px, 2vw, 32px);
  align-items: center;
  justify-content: center;
  width: 100%;
  bottom: 1vh;
`;

export const But = styled.div`
  &:hover,
  &:active {
    transform: scale(0.88);
    transition: transform 0.2s ease;
    color: #c69b0f;
  }
`;

export const Num = styled.div`
  width: clamp(40px, 8vw, 100px);
  font-size: clamp(12px, 0.88vw, 24px);
  display: flex;
  justify-content: center;
`;

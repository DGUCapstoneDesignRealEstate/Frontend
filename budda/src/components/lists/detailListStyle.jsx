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
  display: flex;
  height: 40vh;
  margin: 2vh 0vw 2vh 8vw;
`;

export const Feature = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(8px, 2vh, 20px);
  justify-content: center;
`;

export const SaleDate = styled.div`
  animation: ${({ animate }) => (animate ? slideDown : 'none')} 0.3s ease-in;
  display: flex;
  align-items: center;
  height: 28px;
`;

export const Title = styled.div`
  display: flex;
  font-size: clamp(12px, 1.4vw, 14px);
  width: 12.8vw;
  min-width: 80px;
`;

export const Text = styled.div`
  display: flex;
  font-size: clamp(12px, 1.4vw, 14px);
  font-weight: 500;
  white-space: nowrap;
  width: 16vw;
  min-width: 80px;
`;

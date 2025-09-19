import styled from 'styled-components';

export const FilterWrapper = styled.div`
  position: relative;
  min-width: 320px;
  width: 24vw;
  min-height: 24px;
  height: 3.2vh;
  border-radius: 12px;
  background-color: #f9f1e3;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 2px #ddd;
  cursor: pointer;
  gap: clamp(12px, 2vw, 20px);
  font-weight: 500;
  font-size: clamp(12px, 0.88vw, 24px);
`;
export const FilterText = styled.div``;
export const DateChoice = styled.input`
  border: none;
  background-color: transparent;
  font-weight: 500;
  font-size: clamp(12px, 0.88vw, 24px);
  text-align: center;
`;

export const Du = styled.div`
  display: flex;
  gap: clamp(8px, 0.4vw, 20px);
`;

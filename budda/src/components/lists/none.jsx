import React from 'react';
import styled from 'styled-components';
import { FaExclamation } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 184px);
  color: #ccaf78;
  gap: 20px;
`;
const Text = styled.div`
  font-family: 'SCDream4';
`;

export default function None(props) {
  return (
    <Wrapper>
      <FaExclamation style={{ fontSize: 120 }} />
      <Text>{props.noText}</Text>
    </Wrapper>
  );
}

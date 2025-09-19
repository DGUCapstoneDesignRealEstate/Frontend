import React from 'react';
import styled from 'styled-components';
import { FaExclamation } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(72vh - 96px);
  color: #ccaf78;
  width: 100vw;
  margin: 0 auto;
  gap: 4vh;
`;
const Text = styled.div``;

export default function None(props) {
  return (
    <Wrapper>
      <FaExclamation style={{ fontSize: 120 }} />
      <Text>{props.noText}</Text>
    </Wrapper>
  );
}

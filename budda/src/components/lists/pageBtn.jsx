import React, { useState } from 'react';
import styled from 'styled-components';
import { IoCaretBack, IoCaretForward } from 'react-icons/io5';
import './pageBtn.css';

const PageWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  position: fixed; /* 화면에 고정 */
  bottom: 64px;
  left: 50%; /* 화면의 가로 가운데 */
  transform: translateX(-50%); /* 가운데 정렬 */
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Num = styled.div`
  font-family: 'SCDream3';
  font-size: 12px;
`;

export default function PageBtn(props) {
  const [num, setNum] = useState(props.pageNum);
  const maxNum = props.maxNum;

  const pageDown = () => {
    if (num > 1) setNum((num) => num - 1);
    else return;
  };

  const pageUp = () => {
    if (num < maxNum) setNum((num) => num + 1);
    else return;
  };

  return (
    <PageWrapper>
      <Container>
        <IoCaretBack onClick={pageDown} className="pagemove" />
        <Num>
          {num} / {maxNum}
        </Num>
        <IoCaretForward onClick={pageUp} className="pagemove" />
      </Container>
    </PageWrapper>
  );
}

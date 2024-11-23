import React, { useState } from "react";
import { PiSirenFill } from "react-icons/pi";
import styled, { keyframes } from "styled-components";

const pressEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const SelButton = styled.div`
  cursor: pointer;
  margin-top: 1px;
  animation: ${({ isPressed }) => (isPressed ? pressEffect : "none")} 0.2s ease;
`;

export default function DoubtSelection() {
  const [isDoubt, setIsDoubt] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const handleDoubt = () => {
    setIsDoubt((prev) => !prev);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200); // 애니메이션 끝나면 초기화
  };

  return (
    <SelButton onClick={handleDoubt} isPressed={isPressed}>
      <PiSirenFill color={isDoubt ? "red" : "black"} size={24} />
    </SelButton>
  );
}

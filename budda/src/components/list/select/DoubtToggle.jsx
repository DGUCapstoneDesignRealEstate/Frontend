import { PiSirenFill } from 'react-icons/pi';
import styled, { keyframes } from 'styled-components';
import { useFilterContext } from '../../../context/FilterContext';

const pressEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.9); }
  100% { transform: scale(1); }
`;

const SelButton = styled.div`
  cursor: pointer;
  margin-top: 1px;
  animation: ${({ isPressed }) => (isPressed ? pressEffect : 'none')} 0.2s ease;
`;

export default function DoubtToggle() {
  const { isDoubt, isPressed, handleDoubt } = useFilterContext();

  return (
    <SelButton onClick={handleDoubt} isPressed={isPressed}>
      <PiSirenFill color={isDoubt ? 'red' : 'black'} size={24} />
    </SelButton>
  );
}

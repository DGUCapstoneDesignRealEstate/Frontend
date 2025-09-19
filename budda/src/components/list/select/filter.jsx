import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pressEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
`;

const FilterWrapper = styled.div`
  position: relative;
  z-index: 10;
`;

const FilterContainer = styled.div`
  width: ${({ width }) => width || '120px'};
  height: 3.2vh;
  min-height: 24px;
  border-radius: 12px;
  background-color: #f9f1e3;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 2px 2px #ddd;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: ${({ isPressed }) => (isPressed ? pressEffect : 'none')} 0.3s ease;
`;

const FilterText = styled.div`
  font-weight: 500;
  font-size: clamp(12px, 0.88vw, 24px);
  z-index: 1;
`;

const FilterToggle = styled.div`
  position: absolute;
  border-radius: 12px;
  width: ${({ width }) => width || '120px'};
  max-height: ${({ isOpen }) => (isOpen ? '84px' : '0')};
  display: flex;
  flex-direction: column;
  background-color: #f9f1e3;
  top: 28px;
  overflow-y: auto;
  scrollbar-width: none;
  animation: ${slideDown} 0.3s ease forwards;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
`;

const FilterMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(12px, 0.88vw, 24px);
  cursor: pointer;
  width: 100%;
  line-height: 28px;

  &:hover {
    background-color: #ffe99a;
    font-weight: 500;
  }
`;

const Ripple = styled.span`
  position: absolute;
  border-radius: 50%;
  background-color: rgba(228, 214, 190, 0.6);
  transform: scale(0);
  animation: ripple-animation 0.5s ease-out;
  pointer-events: none;

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

export default function Filter({ list, width = '120px', onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(list[0].name);
  const [ripplePosition, setRipplePosition] = useState(null);
  const [isPressed, setIsPressed] = useState(false);
  const wrapperRef = useRef(null);

  const toggleDropDown = (e) => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 300);

    const rect = e.currentTarget.getBoundingClientRect();
    setRipplePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    setIsOpen(!isOpen);

    // Ripple 애니메이션이 끝난 후 상태 초기화
    setTimeout(() => setRipplePosition(null), 500);
  };

  const handleOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onChange) {
      onChange(option); // 선택된 옵션을 외부로 전달
    }
  };

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <FilterWrapper ref={wrapperRef}>
      <FilterContainer
        onClick={toggleDropDown}
        isPressed={isPressed}
        width={width}
      >
        <FilterText>
          {selectedOption ||
            list[0].apartmentName ||
            list[0].areaForExclusiveUse}
        </FilterText>
        {ripplePosition && (
          <Ripple
            style={{
              left: ripplePosition.x,
              top: ripplePosition.y,
              width: '120px',
              height: '120px',
            }}
          />
        )}
      </FilterContainer>
      {isOpen && (
        <FilterToggle isOpen={isOpen} width={width}>
          {list.map((d) => (
            <FilterMenu
              onClick={() =>
                handleOption(d.name || d.apartmentName || d.areaForExclusiveUse)
              }
              key={d.name || d.apartmentName || d.areaForExclusiveUse}
            >
              {d.name || d.areaForExclusiveUse || d.apartmentName}
            </FilterMenu>
          ))}
        </FilterToggle>
      )}
    </FilterWrapper>
  );
}

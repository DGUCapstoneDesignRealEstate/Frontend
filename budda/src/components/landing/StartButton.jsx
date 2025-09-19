import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #f0d9ae;
  border-radius: 20px;
  height: 40px;
  width: 240px;
  cursor: pointer;
  text-align: center;
  line-height: 40px;
  &:hover {
    background-color: #ffe99a;
    box-shadow: 0px 4px 4px #00000020;
    font-weight: 500;
  }
`;
const Text = styled.span`
  font-size: 24px;
  color: black;
`;

export default function StartButton() {
  return (
    <Container>
      <Link to="/all-list" style={{ textDecoration: 'none' }}>
        <Text>시작하기</Text>
      </Link>
    </Container>
  );
}

import styled from 'styled-components';
import Header from '../components/common/header/header';
import StartButton from '../components/landing/StartButton';
import LogoCenter from '../components/landing/LogoCenter';

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f9f1e3;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  height: 100vh;
`;

export default function StartPage() {
  return (
    <Background>
      <Container>
        <LogoCenter />
        <StartButton />
      </Container>
      <Header title="부동산 이상거래 후보군 선별 서비스" />
    </Background>
  );
}

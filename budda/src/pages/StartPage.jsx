import styled from 'styled-components';
import Header from '../components/header/header';
import LogoHome from '../components/logo/logoHome';

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #f9f1e3;
`;

export default function StartPage() {
  return (
    <Background>
      <LogoHome />
      <Header title="" />
    </Background>
  );
}

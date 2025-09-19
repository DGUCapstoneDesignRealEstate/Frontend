import logo from '../../assets/img/logo.svg';
import styled from 'styled-components';

const ImageBox = styled.div`
  height: 280px;
  width: 280px;
  position: relative;
`;

export default function LogoCenter() {
  return (
    <ImageBox>
      <img src={logo} />
    </ImageBox>
  );
}

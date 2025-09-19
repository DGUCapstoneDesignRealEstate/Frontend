import * as S from './Header.syled';
import Budda from '../../../assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Header(props) {
  const nav = useNavigate();
  return (
    <S.HeaderContainer>
      <S.HeaderBox>
        <img src={Budda} alt="로고이미지" width={80} onClick={() => nav('/')} />
        <S.HeaderTitle>{props.title}</S.HeaderTitle>
      </S.HeaderBox>
    </S.HeaderContainer>
  );
}

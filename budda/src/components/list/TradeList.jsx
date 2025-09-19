import * as S from './styles/TradeList.styled';
import { IoCaretBack, IoCaretForward } from 'react-icons/io5';
import None from '../common/none';
import TradeItem from './TradeItem';
import useTradeList from '../../hooks/useTradeList';

export default function TradeList() {
  const { aptList, load, handlePage, pageNum, totalPage, shouldAnimate } =
    useTradeList();

  if (!aptList) {
    return <div>로딩 중...</div>;
  }
  return (
    <S.Wrapper>
      <S.Header>
        <S.AptName>아파트명</S.AptName>
        <S.Location>지역</S.Location>
        <S.Area>전용 면적</S.Area>
        <S.SaleDate>거래일자</S.SaleDate>
        <S.RealPrice>실거래가(단위: 만 원)</S.RealPrice>
        <S.PredictPrice>예측거래가(단위: 만 원)</S.PredictPrice>
        <S.DoubtType>의심 여부</S.DoubtType>
      </S.Header>
      <S.List>
        {!load ? (
          aptList.map((apt) => (
            <TradeItem apt={apt} key={apt.id} shouldAnimate={shouldAnimate} />
          ))
        ) : (
          <None noText="로딩 중..." />
        )}
      </S.List>
      {!load && (
        <S.PageWrapper>
          <S.But>
            <IoCaretBack
              onClick={() => handlePage(pageNum - 1)}
              disabled={pageNum <= 1}
              cursor="pointer"
            />
          </S.But>
          <S.Num>
            {pageNum} / {totalPage}
          </S.Num>
          <S.But>
            <IoCaretForward
              onClick={() => handlePage(pageNum + 1)}
              disabled={pageNum >= totalPage}
              cursor="pointer"
            />
          </S.But>
        </S.PageWrapper>
      )}
    </S.Wrapper>
  );
}

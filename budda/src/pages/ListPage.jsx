import Header from '../components/common/header/header';
import styled from 'styled-components';
import { FilterProvider } from '../context/FilterContext';
import TradeList from '../components/list/TradeList';
import FilterList from '../components/list/select/filterList';
import SearchBar from '../components/list/SearchBar';

const Container = styled.div`
  position: absolute;
  top: calc(96px + 2vh);
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 1.2vh;
  &::-webkit-scrollbar {
    display: none;
  }
  height: calc(98vh - 96px);
  width: 100%;
  align-items: center;
  margin: 0 auto;
`;

const Head = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: clamp(12px, 1.2vh, 32px);
  padding: 0vh 4vw 0vh 4vw;
`;

export default function ListPage() {
  const title = '주택 전체 거래 내역';

  return (
    <FilterProvider>
      <Container>
        <Head>
          <FilterList />
          <SearchBar />
        </Head>
        <TradeList />
        <Header title={title} />
      </Container>
    </FilterProvider>
  );
}

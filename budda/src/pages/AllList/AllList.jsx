import React from 'react';
import Header from '../../components/header/header';
import FilterList from '../../components/select/filterList';
import styled from 'styled-components';
import ListCompo from '../../components/lists/listComponent';
import PageBtn from '../../components/lists/pageBtn';
import SearchBar from '../../components/searchBar/searchBar';
import FooterHome from '../../components/footer/footerStart';
import DoubtSelection from '../../components/select/DoubtIcon';

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 164px);
  display: flex;
  flex-direction: column;
  top: 104px;
  padding-top: 12px;
  overflow: auto;
  gap: 12px;
  &::-webkit-scrollbar {
    height: 8px;
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #f9f1e3;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const Content = styled.div`
  display: flex;
  gap: 20px;
`;

export default function AllList() {
  const title = '주택 전체 거래 내역';
  const pageNum = 1;
  const maxNum = 20;

  return (
    <Wrapper>
      <FilterList />
      <Content>
        <SearchBar />
        <DoubtSelection />
      </Content>
      <ListCompo />
      <PageBtn pageNum={pageNum} maxNum={maxNum} />
      <FooterHome />
      <Header title={title} />
    </Wrapper>
  );
}

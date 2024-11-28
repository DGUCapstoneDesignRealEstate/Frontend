import React from "react";
import Header from "../../components/header/header";
import FilterList from "../../components/select/filterList";
import styled from "styled-components";
import ListCompo from "../../components/lists/listComponent";
import SearchBar from "../../components/searchBar/searchBar";
import { FilterProvider } from "../../context/FilterContext";

const Wrapper = styled.div`
  position: absolute;
  top: calc(96px + 2vh);
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 1.2vh;
  &::-webkit-scrollbar {
    display: none;
  }
  height: calc(100vh - 96px - 2vh);
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

export default function AllList() {
  const title = "주택 전체 거래 내역";

  return (
    <FilterProvider>
      <Wrapper>
        <Head>
          <FilterList />
          <SearchBar />
        </Head>
        <ListCompo />
        <Header title={title} />
      </Wrapper>
    </FilterProvider>
  );
}

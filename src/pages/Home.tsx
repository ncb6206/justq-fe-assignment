import { useEffect } from 'react';
import { GET } from '../service/products';

import ProductList from '../components/List/ProductList';
import styled from 'styled-components';
import ProductPagination from '../components/Ui/Pagination/ProductPagination';
import usePageStore from '../stores/pageStore';
import PageDropdown from '../components/Ui/Dropdown/PageDropdown';

const HomePage = () => {
  const getLength = async () => {
    const response = await GET({ type: 'length' });
    usePageStore.setState({ listLength: response });
  };

  useEffect(() => {
    getLength();
  }, []);

  return (
    <HomeDiv>
      <HomeHeader>
        <p>상품 목록</p>
        <PageDropdown />
      </HomeHeader>
      <ProductList />
      <ProductPagination />
    </HomeDiv>
  );
};

const HomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`;

export default HomePage;

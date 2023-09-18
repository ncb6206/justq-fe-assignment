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
        <span>상품 목록</span>
        <PageDropdown />
      </HomeHeader>
      <ProductList />
      <ProductPagination />
    </HomeDiv>
  );
};

const HomeDiv = styled.div`
  width: 65rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background-color: #ffffff;
  margin-bottom: 1rem;
`;

const HomeHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;

  span {
    font-size: 2rem;
  }
`;

export default HomePage;

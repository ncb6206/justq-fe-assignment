import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { GET } from '../service/products';
import ProductList from '../components/List/ProductList';
import ProductPagination from '../components/Ui/Pagination/ProductPagination';
import usePageStore from '../stores/pageStore';
import PageComboBox from '../components/Ui/ComboBox/PageComboBox';

const HomePage = () => {
  const { data } = useQuery({
    queryKey: ['getProductsLength'],
    queryFn: () => GET({ type: 'length' }),
  });

  if (data >= 0) {
    usePageStore.setState({ listLength: data });
  }

  return (
    <HomeDiv>
      <HomeHeader>
        <span>상품 목록</span>
        <PageComboBox />
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

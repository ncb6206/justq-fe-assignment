// import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Input } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';
import { useNavigate } from 'react-router-dom';

// import { GET } from '../service/products';
import ProductList from '../components/List/ProductList';
// import ProductPagination from '../components/Ui/Pagination/ProductPagination';
// import usePageStore from '../stores/pageStore';
import PageComboBox from '../components/Ui/ComboBox/PageComboBox';
import { useEffect, useState } from 'react';

const { Search } = Input;

const HomePage = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState('');
  // const { data } = useQuery({
  //   queryKey: ['getProductsLength'],
  //   queryFn: () => GET({ type: 'length' }),
  // });

  // if (data >= 0) {
  //   usePageStore.setState({ listLength: data });
  // }

  const onSearch: SearchProps['onSearch'] = (value, _e, info) => {
    console.log(info?.source, value);
    const params = new URLSearchParams(location.search);
    params.set('query', value);

    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const value = params.get('query');

    console.log(value);

    if (value) {
      setProduct(value);
    }
  }, []);

  return (
    <HomeDiv>
      <HomeHeader>
        <HeaderLeft>상품 목록</HeaderLeft>
        <HeaderRight>
          <Search
            placeholder="상품 검색"
            allowClear
            defaultValue={product}
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <PageComboBox />
        </HeaderRight>
      </HomeHeader>
      <ProductList />
      {/* <ProductPagination /> */}
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
`;

const HeaderLeft = styled.span`
  font-size: 2rem;
`;

const HeaderRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
`;

export default HomePage;

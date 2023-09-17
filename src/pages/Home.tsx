import { useEffect, useState } from 'react';
import { GET } from '../service/products';

import ProductList from '../components/List/ProductList';
import type { PaginationProps } from 'antd';
import styled from 'styled-components';
import ProductPagination from '../components/Pagination/ProductPagination';

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSizes, setPageSizes] = useState(10);
  const [pageLength, setPageLength] = useState(0);

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize,
  ) => {
    setCurrentPage(current);
    setPageSizes(pageSizes);
    console.log(current, pageSize, currentPage, pageSizes);
  };

  const getLength = async () => {
    const response = await GET({ type: 'length' });
    setPageLength(response);
    // console.log(productList);
  };

  useEffect(() => {
    getLength();
  }, []);

  return (
    <HomeDiv>
      <HomeHeader>
        <p>상품 목록</p>
      </HomeHeader>
      <ProductList currentPage={currentPage} pageSizes={pageSizes} />
      <ProductPagination
        onShowSizeChange={onShowSizeChange}
        pageLength={pageLength}
        currentPage={currentPage}
        pageSizes={pageSizes}
      />
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

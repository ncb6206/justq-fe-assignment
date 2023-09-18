import { useEffect } from 'react';

import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import usePageStore from '../../../stores/pageStore';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

const ProductPagination = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    listLength,
    pageLength,
    currentPage,
    pageSize,
    pageArray,
    increasePage,
    decreasePage,
    goFirstPage,
    goLastPage,
    clickPage,
    generatePageNumbers,
  } = usePageStore(state => state);

  useEffect(() => {
    usePageStore.setState({ pageLength: Math.ceil(listLength / pageSize) });

    if (currentPage && pageLength && currentPage > pageLength) {
      console.log(currentPage, pageLength);
      usePageStore.setState({ currentPage: pageLength });
    }
  }, [pageLength, pageSize, currentPage, listLength]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set('page', String(currentPage));

    generatePageNumbers();
    navigate(`?${params.toString()}`);
  }, [currentPage, generatePageNumbers, location.search, navigate, pageLength]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const page = params.get('page');

    if (page) usePageStore.setState({ currentPage: Number(page) });
  }, [location.search]);

  return (
    <ProductPaginationDiv>
      <div onClick={goFirstPage}>
        <DoubleLeftOutlined />
      </div>
      <div onClick={decreasePage}>
        <LeftOutlined />
      </div>

      {pageArray.map(page => (
        <div onClick={() => clickPage(page)}>{page}</div>
      ))}
      <div onClick={increasePage}>
        <RightOutlined />
      </div>
      <div onClick={goLastPage}>
        <DoubleRightOutlined />
      </div>
    </ProductPaginationDiv>
  );
};

const ProductPaginationDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
`;

export default ProductPagination;

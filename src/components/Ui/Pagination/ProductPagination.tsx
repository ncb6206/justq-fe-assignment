import { useEffect } from 'react';

import {
  LeftOutlined,
  RightOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import usePageStore from '../../../stores/pageStore';
import styled, { css } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { IPaginationDivProps } from '../../../types/product';

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

    if (!page || isNaN(Number(page))) {
      console.error('Invalid page value:', page);
      return;
    }

    if (Number(page) > 0) {
      usePageStore.setState({ currentPage: Number(page) });
    }
  }, [location.search]);

  return (
    <ProductPaginationDiv>
      <PaginationButton onClick={goFirstPage}>
        <DoubleLeftOutlined />
      </PaginationButton>
      <PaginationButton onClick={decreasePage}>
        <LeftOutlined />
      </PaginationButton>
      {pageArray.map(page => (
        <PaginationDiv
          onClick={() => clickPage(page)}
          page={page}
          currentPage={currentPage}
        >
          {page}
        </PaginationDiv>
      ))}
      <PaginationButton onClick={increasePage}>
        <RightOutlined />
      </PaginationButton>
      <PaginationButton onClick={goLastPage}>
        <DoubleRightOutlined />
      </PaginationButton>
    </ProductPaginationDiv>
  );
};

const ProductPaginationDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1rem 0;
`;

const Paginate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 29px;
  height: 29px;
  margin: 0 0.5rem;
  cursor: pointer;

  &:hover {
    color: #df1b1b;
  }
`;

const PaginationButton = styled(Paginate)`
  border: 1px solid #bbb;
`;

const PaginationDiv = styled(Paginate)<IPaginationDivProps>`
  font-size: 1.2rem;
  font-weight: 600;
  user-select: none;

  &:hover {
    text-decoration: underline;
  }

  ${props =>
    props.page === props.currentPage &&
    css`
      border: 1px solid #0073e9;
      color: #0073e9;

      &:hover {
        color: #0073e9;
        text-decoration: underline;
      }
    `}
`;

export default ProductPagination;

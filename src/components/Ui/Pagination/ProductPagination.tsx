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
  const params = new URLSearchParams(location.search);
  const page = params.get('page');

  const {
    listLength,
    pageLength,
    currentpage,
    pagesize,
    pageArray,
    increasePage,
    decreasePage,
    goFirstPage,
    goLastPage,
    clickPage,
    generatePageNumbers,
  } = usePageStore(state => state);

  useEffect(() => {
    const calPageLength = Math.ceil(listLength / pagesize);
    usePageStore.setState({ pageLength: calPageLength });

    generatePageNumbers();

    if (currentpage && calPageLength && currentpage > calPageLength) {
      usePageStore.setState({ currentpage: calPageLength });
    }
  }, [currentpage, pageLength, pagesize, listLength, generatePageNumbers]);

  useEffect(() => {
    if (!page || isNaN(Number(page))) return;

    if (Number(page) > 0) {
      usePageStore.setState({ currentpage: Number(page) });
    }
  }, [page]);

  useEffect(() => {
    params.set('page', String(currentpage));

    if (!page && currentpage == 1) return;

    navigate(`?${params.toString()}`);
    // params와 page를 의존성 배열에 추가하면 뒤로가기가 안되기 때문에 주석 처리
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentpage, navigate]);

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
          key={page}
          page={page}
          currentpage={currentpage}
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
  user-select: none;
`;

const PaginationDiv = styled(Paginate)<IPaginationDivProps>`
  font-size: 1.2rem;
  font-weight: 600;
  user-select: none;

  &:hover {
    text-decoration: underline;
  }

  ${props =>
    props.page === props.currentpage &&
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

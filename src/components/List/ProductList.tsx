import React, { useCallback, useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import _ from 'lodash';

import { GET } from '../../service/products';
import { IProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';
import usePageStore from '../../stores/pageStore';
import Loading from '../Ui/Loading/Loading';

const ProductList = () => {
  const { pagesize } = usePageStore(state => state);
  const { ref, inView } = useInView({ threshold: 0.5 });

  const fetchProductList = useCallback(
    async ({ pageParam }: { pageParam: number }) => {
      const params = new URLSearchParams(location.search);
      const value = params.get('query');

      console.log(pageParam, value);
      return await GET({
        product: String(value),
        type: 'data',
        pagesize,
        currentpage: pageParam,
      });
    },
    [pagesize],
  );

  const {
    data,
    status,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['getProducts', pagesize],
    queryFn: fetchProductList,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalPageLength = allPages.reduce(
        (total: number, currentArray: IProductType[]) =>
          total + currentArray.length,
        0,
      );
      const nextPage =
        lastPage.length && totalPageLength < 1000
          ? totalPageLength + pagesize
          : undefined;
      return nextPage;
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const throttledFetchNextPage = useCallback(_.throttle(fetchNextPage, 1000), [
    fetchNextPage,
  ]);

  useEffect(() => {
    if (inView && hasNextPage) {
      throttledFetchNextPage();
    }
  }, [hasNextPage, inView, throttledFetchNextPage]);

  console.log(
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  );

  return (
    <ProductListDiv>
      {isFetching && !isFetchingNextPage ? (
        <LoadingDiv pagesize={pagesize}>
          <Loading />
        </LoadingDiv>
      ) : (
        <>
          {data?.pages.map((products: IProductType[], i: number) => (
            <React.Fragment key={i}>
              {products.map((product: IProductType) => (
                <ProductListItem key={product.productId} product={product} />
              ))}
            </React.Fragment>
          ))}

          {hasNextPage && isFetchingNextPage && isFetching ? (
            <Loading />
          ) : (
            <RefDiv ref={ref} />
          )}
        </>
      )}
    </ProductListDiv>
  );
};

const ProductListDiv = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

const LoadingDiv = styled.div<{ pagesize: number }>`
  width: 100%;
  min-height: ${props => (props.pagesize === 5 ? '350px' : '700px')};
  display: flex;
  align-items: center;
`;

const RefDiv = styled.div`
  height: 50px;
`;

export default ProductList;

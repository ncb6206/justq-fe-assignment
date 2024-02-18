import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { GET } from '../../service/products';
import { IProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';
import usePageStore from '../../stores/pageStore';
import Loading from '../Ui/Loading/Loading';
import useQueryStore from '../../stores/queryStore';

const ProductListPaging = () => {
  const { currentpage, pagesize } = usePageStore();
  const { query } = useQueryStore();

  const fetchProductList = useCallback(async () => {
    console.log(currentpage, query);
    return await GET({
      product: String(query),
      type: 'data',
      pagesize,
      currentpage: (currentpage - 1) * pagesize + 1,
    });
  }, [currentpage, pagesize, query]);

  const { data, isLoading } = useQuery({
    queryKey: ['getProductsPaging', query, pagesize, currentpage],
    queryFn: fetchProductList,
  });

  console.log(data, isLoading);

  return (
    <ProductListDiv>
      {isLoading ? (
        <LoadingDiv pagesize={pagesize}>
          <Loading />
        </LoadingDiv>
      ) : (
        <>
          {data?.map((products: IProductType) => (
            <ProductListItem key={products.productId} product={products} />
          ))}
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

export default ProductListPaging;

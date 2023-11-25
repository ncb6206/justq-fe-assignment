import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { GET } from '../../service/products';
import { IProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';
import usePageStore from '../../stores/pageStore';
import Loading from '../Ui/Loading/Loading';

const ProductList = () => {
  const { currentpage, pagesize } = usePageStore(state => state);
  const { data, isLoading } = useQuery({
    queryKey: ['getProducts', pagesize, currentpage],
    queryFn: () =>
      GET({
        type: 'data',
        pagesize,
        currentpage,
      }),
  });

  return (
    <ProductListDiv>
      {isLoading ? (
        <LoadingDiv pagesize={pagesize}>
          <Loading />
        </LoadingDiv>
      ) : (
        data?.map((product: IProductType) => (
          <ProductListItem key={product.id} product={product} />
        ))
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

export default ProductList;

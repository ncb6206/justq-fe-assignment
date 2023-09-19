import { useState, useEffect, useCallback } from 'react';

import { GET } from '../../service/products';
import { IProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';
import usePageStore from '../../stores/pageStore';
import styled from 'styled-components';
import Loading from '../Ui/Loading/Loading';

const ProductList = () => {
  const [productList, setProductList] = useState<IProductType[]>([]);
  const { currentpage, pagesize, isLoading } = usePageStore(state => state);

  const getProducts = useCallback(async () => {
    usePageStore.setState({ isLoading: true });

    const response = await GET({
      type: 'data',
      pagesize,
      currentpage,
    });
    setProductList(response);

    usePageStore.setState({ isLoading: false });
  }, [currentpage, pagesize]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <ProductListDiv>
      {isLoading ? (
        <LoadingDiv pagesize={pagesize}>
          <Loading />
        </LoadingDiv>
      ) : (
        productList?.map(product => (
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

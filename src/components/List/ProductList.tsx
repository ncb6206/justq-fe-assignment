import { useState, useEffect, useCallback } from 'react';

import { GET } from '../../service/products';
import { IProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';
import usePageStore from '../../stores/pageStore';
import styled from 'styled-components';

const ProductList = () => {
  const [productList, setProductList] = useState<IProductType[]>([]);
  const { currentPage, pageSize } = usePageStore(state => state);

  const getProducts = useCallback(async () => {
    const response = await GET({
      type: 'data',
      pageSize,
      currentPage,
    });
    setProductList(response);
    // console.log(productList);
  }, [currentPage, pageSize]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <ProductListDiv>
      {productList.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </ProductListDiv>
  );
};

const ProductListDiv = styled.div`
  width: 100%;
  margin: 1rem 0;
`;

export default ProductList;

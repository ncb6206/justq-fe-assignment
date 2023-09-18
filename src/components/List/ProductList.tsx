import { useState, useEffect, useCallback } from 'react';

import { GET } from '../../service/products';
import { IProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';
import usePageStore from '../../stores/pageStore';

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
    <div>
      {productList.map(product => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;

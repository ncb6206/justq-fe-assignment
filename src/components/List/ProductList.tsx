import { useState, useEffect, useCallback } from 'react';

import { GET } from '../../service/products';
import { IProductListItem, IProductType } from '../../types/product';
import ProductListItem from '../Item/ProductListItem';

const ProductList = ({ currentPage, pageSizes }: IProductListItem) => {
  const [productList, setProductList] = useState<IProductType[]>([]);

  const getProducts = useCallback(async () => {
    const response = await GET({
      type: 'data',
      limit: pageSizes,
      page: currentPage,
    });
    setProductList(response);
    // console.log(productList);
  }, [currentPage, pageSizes]);

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

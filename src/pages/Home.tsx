import { useEffect, useState } from 'react';
import { GET } from '../service/products';
import ProductList from '../components/List/ProductList';
import Pagination from '../components/Pagination/Pagination';
import { ProductType } from '../types/product';

const HomePage = () => {
  // const [currentPage, setCurrentPage] = useState(0);
  // const [pageSize, setPageSize] = useState(5);
  const [productList, setProductList] = useState<ProductType[]>([]);

  const getProducts = async () => {
    const response = await GET({ limit: 10, page: 0 });
    setProductList(response);
    // console.log(productList);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <ProductList productList={productList} />
      <Pagination />
    </div>
  );
};

export default HomePage;
